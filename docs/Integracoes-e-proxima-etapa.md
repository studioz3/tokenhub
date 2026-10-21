# Da interface à operação TokenHub

Esta é uma proposta de arquitetura. Não descreve servidores ou contratos privados da Tokeniza.

## Domínios de serviço

| Domínio | Responsabilidade | Condição para operar |
|---|---|---|
| Identidade | Cadastro, sessão, recuperação, verificação de e-mail e 2FA | API própria, senhas com hash resistente, cookies de sessão seguros, rate limiting e auditoria |
| Cadastro e KYC | Titularidade, documentos, análise e estados | Provedor contratado, finalidades e retenção definidas, webhooks autenticados |
| Catálogo | Ofertas, emissores, documentos, atualizações e filtros | Backoffice editorial e aprovação das informações |
| Elegibilidade | Perfil, limites, requisitos e autorizações por oferta | Regras versionadas e verificação em servidor |
| Ordens | Revisão, aceite, reserva, assinatura e cancelamento | Idempotência, autorização, trilha de aceite e regras de janela de desistência definidas |
| Carteira e extrato | Posições, ledger, saldos e reconciliação | Contabilidade de movimentações e fontes de verdade separadas de projeções |
| Liquidação e custódia | Recebimento, liquidação, emissão e titularidade | Provedores, contratos, segurança de chaves e reconciliação |
| Conta digital e Pix | Abertura, análise, chaves, pagamentos e transferências | Parceiro financeiro, homologação e confirmação autenticada |
| Marketplace e OTC | Ordens, cotação, taxas, contraparte e transferência | Regras de negociação, suitability/eligibilidade e liquidez contratual |
| Documentos e fiscal | Informe, exercício, titular e download | Dados tributários reconciliados e validação contábil |
| Indicações | Atribuição, condições, ganhos e antifraude | Política comercial e critérios de atribuição formalizados |
| Comunicações | E-mails, suporte, consentimentos e notificações | Provedores contratados e preferências de comunicação |

## Estados mínimos a especificar

- Cadastro: rascunho → e-mail verificado → análise KYC → aprovado/reprovado/pendência → suspenso/encerrado.
- Oferta: preparação → revisão → publicada → encerrada → liquidação → acompanhamento → concluída/cancelada.
- Ordem: revisão → aceite → reserva → pagamento pendente → confirmado → liquidado; caminhos de falha, expiração, cancelamento e estorno precisam ser explícitos.
- Movimentação: criada → em processamento → conciliada/concluída; erros e estornos não devem desaparecer do histórico.
- Conta digital: dados → documentos → análise → aprovada/pendência/reprovada/suspensa; cada estado deve informar próxima ação.

Essas sequências são propostas para refinamento, não comportamentos comprovados da referência.

## Sequência de implementação sugerida

1. Revisar a proposta visual e o inventário, decidir o primeiro conjunto de produtos e retirar módulos sem operação planejada.
2. Definir domínio oficial, dados institucionais, documentos, requisitos de autorização e conteúdo real.
3. Escolher stack, banco de dados, identidade e provedores; estabelecer ambientes separados de desenvolvimento, homologação e produção.
4. Implementar identidade e catálogo; em seguida, elegibilidade, ordens, ledger e reconciliação com dinheiro fictício em homologação.
5. Integrar serviços bancários e custódia apenas para os produtos contratados.
6. Executar testes de autorização, idempotência, falhas, webhooks, reconciliação, recuperação, acessibilidade e segurança antes de liberar usuários e valores reais.

## Critérios de aceite para operação

- Nenhuma transação pode depender apenas de validação no navegador.
- O servidor precisa recalcular valores e verificar titular, limites, estado da oferta, versão dos termos e idempotência.
- Recursos de uma conta não podem ser acessados alterando IDs em URLs.
- Documentos pessoais precisam de controle de acesso e de retenção; uploads não podem ser públicos por padrão.
- O frontend não deve receber segredos de provedores nem chaves privadas de custódia.
- Estados concluídos dependem de confirmação conciliada, não de simples clique ou retorno otimista.
- A identidade TokenHub precisa ser aplicada também a e-mails, comprovantes, contratos e mensagens de erro dos provedores.

Não foram estipulados prazos, orçamento, tarifas, rentabilidade, autorização regulatória ou fornecedor sem decisão da TokenHub.
