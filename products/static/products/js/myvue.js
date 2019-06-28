Vue.http.headers.common['X-CSRFToken'] = "{{ csrf_token }}";
new Vue({
    el: '#app',
    delimiters: ['${','}'],
    data: {
        products: [],
        loading: true,
        currentProduct:{},
        message: null,
        newProduct: {'product_name': null, 'product_description': null, 'product_price': null},
        search_item:'',
    },
    mounted: function(){
        this.getProducts(); 
    },
    methods: {
        getProducts: function(){
            let api_url = '/api/product/';
            if(this.search_item !=='' || this.search_item !==null){
                api_url = '/api/product/?search='+ this.search_item + '/'
            }
            this.loading = true;
            this.$http.get(api_url)
            .then((response) => {
                this.products = response.data;
                this.loading = false;
            })
            .catch((err) =>{
                this.loading = false;
                console.log(err);
            })
        },
        getProduct: function(id){
            this.loading = true;
            this.$http.get('/api/product/'+ id +'/')
            .then((response) => {
                this.currentProduct = response.data;
                $("#editProductModal").modal('show');
                this.loading = false;
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
        },
        addProduct: function(){
            this.loading = true;
            this.$http.post('/api/product/',this.newProduct)
            .then((response) => {
                this.loading = false;
                this.getProducts();
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
        },
        updateProduct: function(){
            this.loading = true;
            this.$http.put('/api/product/'+ this.currentProduct.id + '/',this.currentProduct)
            .then((response) => {
                this.loading = false;
                this.currentProduct = response.data;
                this.getProducts();
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
        },
        deleteProduct: function(id){
            this.loading = true;
            this.$http.delete('/api/product/'+ id +'/')
            .then((response) => {
                this.loading = false;
                this.getProducts();
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
        }
    }
});