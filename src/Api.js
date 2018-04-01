import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})
const apis = {
    createProduto: (prod) => api.post('produtos', prod),
    loadProdutos: (catId) => {
        return catId ? api.get('/produtos?categoria=' + catId)
            : api.get('/produtos')
    },
    removeProduto: (id) => api.delete('produtos/' + id),
    readProduto: (id) => api.get('produtos/' + id),
    editProduto: (prod) => api.put('produtos/' + prod.id, prod),

    readCategoria: (id) => api.get('categorias/' + id),
    loadCategorias: () => api.get('categorias'),
    removeCategoria: (id) => api.delete('categorias/' + id),
    createCategoria: (cat) => api.post('categorias', cat),
    editCategoria: (cat) => api.put('categorias/' + cat.id, cat)

}

export default apis
