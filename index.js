const fs = require('fs');
const http = require('http')
const axioss = require('axios')
const url  = require('url');

const urlProveedores = 'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json'
const urlClientes = 'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json'

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>TIPO-REEMPLAZAR</title>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

<meta charset="UTF-8">
<meta name="description" content="Ejercicio de node para la clase de programación web">
<meta name="keywords" content="node, ejercicio">
<meta name="author" content="Juan Pablo Campos">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

</head>
<body>

<main class="container">
<h2>Listado de TIPO-REEMPLAZAR </h2>
TABLA-REEMPLAZAR
</main>
</body>
</html>
`

const tableHeadP = `
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Contacto</th>
    </tr>
  </thead>
  <tbody>`






http.createServer(function (req, res) {
    if (req.url == '/api/proveedores') {

        axioss.get(urlProveedores).then((response)=>{
            
            let tabla = tableHeadP

            for(let elem of response.data){
                let row = '<tr>'
                let idProv = elem.idproveedor
                let nombreComp = 'nombrecompania' in elem?elem.nombrecompania: 'N/A'
                let nombreContacto = elem.nombrecontacto
                row += `<th scope="row">${idProv}</th>` 
                row += `<td>${nombreComp}</td>`
                row += `<td>${nombreContacto}</td>`

                row += '</tr>'

                tabla += row
            }
            tabla +='</tbody></table>'

            let html = htmlTemplate.replace('TABLA-REEMPLAZAR', tabla).replace(/TIPO-REEMPLAZAR/g, 'Proveedores')
            
            fs.writeFileSync('./proveedores.html', html)

            fs.readFile('./proveedores.html','utf-8' ,function(err, data) {
                res.end(data);
            });

            
        })


        
    }

    if(req.url == '/api/clientes'){
        if (req.url == '/api/clientes') {
            axioss.get(urlClientes).then((response)=>{
            
                let tabla = tableHeadP
    
                for(let elem of response.data){
                    
                    let idCliente = elem.idCliente
                    let nombreComp = 'NombreCompania' in elem?elem.NombreCompania: 'N/A'
                    let nombreContacto = elem.NombreContacto
                    let row = '<tr>'
                    row += `<th scope="row">${idCliente}</th>` 
                    row += `<td>${nombreComp}</td>`
                    row += `<td>${nombreContacto}</td>`
    
                    row += '</tr>'
    
                    tabla += row
                }
                tabla +='</tbody></table>'
    
                let html = htmlTemplate.replace('TABLA-REEMPLAZAR', tabla).replace(/TIPO-REEMPLAZAR/g, 'Clientes')
                
                fs.writeFileSync('./clientes.html', html)
    
                fs.readFile('./clientes.html','utf-8' ,function(err, data) {
                    res.end(data);
                });
    
                
            })
    
        }
    }
  
  }).listen(8081);


  /*
  

  
  
  
  
  
  */