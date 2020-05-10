# fat-cattitude

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# Printful API
Get list of sync products:
`https://api.printful.com/sync/products`
Copy regular id

Get sync product information:
`https://api.printful.com/store/products/163440250` <- regular id
The regular ids here are the true sync variant ids

Main Product
external_id: 703090796
id: 163440250 <- this one returns results in /store/products/{id}

First Variant
id: 1796349947
external_id: 3573346050
sync_product_id: 163440250
product.product_id: 71
product.variant_id: 9526


TODO:

