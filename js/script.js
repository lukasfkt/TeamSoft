const botaoSubtrai = document.querySelectorAll('.menos')
const botaoAdiciona = document.querySelectorAll('.adiciona')
const botaoAdicionaCarrinho = document.querySelector('.adicionar-carrinho')
const botaoPopOver = document.querySelector('.popover')

function getApi(url) {
  let request = new XMLHttpRequest()
  request.open('GET', url, false)
  request.send()
  return request.responseText
}

function atribuiIngredientesExtra(array) {
  console.log(array)
  array.forEach(ingrediente => {
    const ingredientesValor = document.getElementById(ingrediente.id)
    const ingredientesNome = document
    const preco = parseFloat(ingrediente.vl_item).toFixed(2)
    const nome = ingrediente.nm_item.split(' ').join('-')
    const classesIngredientes = document.querySelector(`.${nome}`)

    classesIngredientes.innerText = ingrediente.nm_item
    ingredientesValor.innerText = `+ R$${preco.replace('.', ',')}`
  })
}

function atribuiPrecoOferta(precos) {
  const precoDesconto = document.getElementById('vl_discount')
  const precoNormal = document.getElementById('vl_price')

  const valorDesconto = parseFloat(precos.vl_discount).toFixed(2)
  const valorNormal = parseFloat(precos.vl_price).toFixed(2)

  precoDesconto.innerText = `R$${valorDesconto.replace('.', ',')}`
  precoNormal.innerText = `R$${valorNormal.replace('.', ',')}`
}

function atribuiOfertas(produto) {
  const nomeProduto = document.getElementById('nm_product')
  const descricaoProduto = document.getElementById('description')

  nomeProduto.innerText = produto.nm_product
  descricaoProduto.innerText = produto.description
  console.log('O URL da imagem não está funcionando:' + produto.url_image)
}

function main() {
  var data = getApi(
    'https://6077803e1ed0ae0017d6aea4.mockapi.io/test-frontend/products'
  )
  const produto = JSON.parse(data)
  const produtoOferta = produto[0]
  const ingredientesExtra = produto[0].ingredients[0].itens

  atribuiOfertas(produtoOferta)
  atribuiPrecoOferta(produtoOferta)
  atribuiIngredientesExtra(ingredientesExtra)
}

main()

botaoSubtrai.forEach(botao => {
  botao.addEventListener('click', function () {
    const Subtrai = botao.classList[1]
    const ingrediente = Subtrai.substring(8)
    const quantia = `quantia-${ingrediente}`

    var quantiaIngrediente = document.getElementsByClassName(quantia)

    if (parseInt(quantiaIngrediente[0].innerText) > 0) {
      botao.style.backgroundColor = 'red'
      quantiaIngrediente[0].innerText =
        parseInt(quantiaIngrediente[0].innerText) - 1
    }
    if (parseInt(quantiaIngrediente[0].innerText) == 0)
      botao.style.backgroundColor = '#aeb6c1'
  })
})

botaoAdiciona.forEach(botao => {
  botao.addEventListener('click', function () {
    const Adiciona = botao.classList[1]
    const Subtrai = botao.parentNode.firstElementChild
    const ingrediente = Adiciona.substring(9)
    const quantia = `quantia-${ingrediente}`

    var quantiaIngrediente = document.getElementsByClassName(quantia)

    if (
      parseInt(quantiaIngrediente[0].innerText) < 5 &&
      (ingrediente == 'cheddar' || ingrediente == 'cebola')
    )
      quantiaIngrediente[0].innerText =
        parseInt(quantiaIngrediente[0].innerText) + 1
    else if (
      parseInt(quantiaIngrediente[0].innerText) < 1 &&
      (ingrediente == 'molhocheddar' || ingrediente == 'molhopicanha')
    )
      quantiaIngrediente[0].innerText =
        parseInt(quantiaIngrediente[0].innerText) + 1
    else if (ingrediente == 'produto')
      quantiaIngrediente[0].innerText =
        parseInt(quantiaIngrediente[0].innerText) + 1
    if (parseInt(quantiaIngrediente[0].innerText) > 0)
      Subtrai.style.backgroundColor = 'red'
  })
})

botaoAdicionaCarrinho.addEventListener('click', function () {
  const carrinho = document.querySelector('.quantia-compra')
  const quantiaProduto = document.querySelector('.quantia-produto')
  const inputTalher = document.querySelectorAll('input[name="talher"]')
  const quantia = document.querySelectorAll('.quantia')
  var empty = [].filter.call(inputTalher, function (el) {
    return !el.checked
  })

  if (parseInt(quantiaProduto.innerText) == 0)
    alert('Você precisa adicionar pelo menos 1 produto ao carrinho')
  else if (inputTalher.length == empty.length) {
    alert('Porfavor selecione uma das opções acima')
  } else {
    produtoAdicionado(quantia)
    carrinho.style.display = 'flex'
    carrinho.firstElementChild.innerText =
      parseInt(carrinho.firstElementChild.innerText) + 1
  }
})

botaoPopOver.addEventListener('click', function () {
  const popOver = document.querySelector('.adicionado-sucesso')

  if (popOver.style.display == 'none') popOver.style.display = 'flex'
  else popOver.style.display = 'none'
})

function produtoAdicionado(quantia) {
  const queijoCheddar = document.getElementById('qnt1')
  const cebolaCrispy = document.getElementById('qnt2')
  const molhoCheddar = document.getElementById('qnt3')
  const molhoPicanha = document.getElementById('qnt4')

  queijoCheddar.innerText = `• ${quantia[0].innerText} Queijo Cheddar`
  cebolaCrispy.innerText = `• ${quantia[1].innerText} Cebola crispy`
  molhoCheddar.innerText = `• ${quantia[0].innerText} Molho cheddar`
  molhoPicanha.innerText = `• ${quantia[0].innerText} Molho picanha`
}
