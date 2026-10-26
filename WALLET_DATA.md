# Dados da carteira

`wallet-model.js` é a única origem dos saldos e totais. O conjunto inicial é um cenário de exemplo; não há acesso bancário, negociação ou cotação ao vivo.

## Contrato do adaptador

A API futura deve fornecer um objeto JSON completo com `schemaVersion: 1`, `asOf` (AAAA-MM-DD), `assets` e `entries`. Após autorização/autenticação no servidor, o adaptador chama `replaceWalletData(payload)`. A interface recebe a atualização através de `subscribeWallet`. Este código não implementa autenticação, persistência ou conexão ao banco de dados.

Cada ativo possui ID, símbolo, rede, casas decimais, apresentação visual e `priceCents` (preço de uma unidade em centavos de BRL). Cada evento possui ID único, data, ativo, `units` (quantidade inteira na menor unidade), `kind` e `status` (`posted`, `pending`, `failed`). Eventos relacionados a investimentos usam BRL e `projectId`. Resgates representam apenas principal e precisam de `principalCents` igual ao crédito; rendimentos são eventos separados.

Somente eventos concluídos até `asOf` entram nos cálculos. Duplicatas, sinais inválidos, saldos negativos e referências a ativos ausentes rejeitam integralmente a atualização. Valores monetários são calculados em centavos; conversões usam aritmética inteira e arredondamento ao centavo.

- Disponível: soma dos equivalentes em BRL dos saldos por ativo.
- Aplicado: aplicações menos resgates de principal, agrupados por projeto.
- Recebido: somente rendimentos efetivamente creditados. Já estão no disponível, sem serem novamente somados ao patrimônio.
- Patrimônio de referência: disponível + principal aplicado. Não inclui projeção de remuneração.
- Saque em BRL: limitado ao saldo BRL, não ao equivalente de todos os criptoativos.

Tabela de investimentos, composição, gráfico do capital aplicado, extrato, CSV e informe usam o mesmo snapshot. A curva é de capital aplicado, não de rentabilidade. As equivalências do extrato usam o snapshot de referência; uma integração operacional deverá fornecer também os valores e cotações históricos por evento.

## Verificação

`node wallet-model.test.mjs`

Cobre reconciliação dos oito ativos, rendimentos, principal, movimentações pendentes, saques, mudanças de cotação, rejeição de duplicatas, saldo negativo e notificações da atualização.
