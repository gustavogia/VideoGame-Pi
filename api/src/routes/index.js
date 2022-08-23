const { Router } = require('express');
const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getvideogames = async () => {
    try {
      const games = [];
      let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
      for (let i = 1; i < 6; i++) {
        let pages = await axios.get(url);
        pages.data?.results.map((e) => {
          games.push({
            id: e.id,
            name: e.name,
            image: e.background_image,
            released:e.released,
            rating: e.rating,
            description:e.description,
            genres: e.genres.map((gender) => gender.name),
            platforms: e.platforms.map((platform) => platform.platform.name),
          });
        });
        url = pages.data.next;
      }
      return games;
    } catch (error) {
      console.log(error);
    }
  };

  
  const getdbgames = async () => {
    try{
    let dbgamesdata = await Videogame.findAll({
      //busca el juego en la base de datos y o retorna
      include: [{
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      }],
    });
  
    return dbgamesdata
  }catch(e){console.error(e)}
  };
  
  const getAllInfo = async () => {
    //para unir mis dos solicitudes, guardo en una variable la ejecucion de mis funciones
    const apiData = await getvideogames ();
    const dbData = await getdbgames();
    const dbformateo = dbData.map((e)=>e.dataValues)
    const dbformat= dbformateo.map((e)=>{
    e.genres=e.genres.map(el=>el.name)
    return e
    })
   
    //ahora uno mis dos constantes contenedoras de funciones
    const infoCompleta = dbformat.concat(apiData)    
    return infoCompleta
}

  ////BUSQUEDA DE VIDEOGAMES TRAE A TODOS Y POR NOMBRE ////

  router.get("/videogames", async (req, res) => {
    //DEVUELVE LOS JUEGOS SI NO LE PASAN QUERY, SI LE PASAN QUERY LO BUSCA Y DEVUELVE LAS PRIMERAS 15 COINCIDENCIAS
    const { name } = req.query;
  
    const allgames = await getAllInfo();
    if (name) {
      let gameName = allgames
        .filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
        .slice(0, 16);
      gameName.length
        ? res.status(200).json(gameName)
        : res.status(404).send("no existe el juego");
    } else {
      res.status(200).send(allgames);
    }
  });

//////BUSQUEDA DE GENEROS, TRAE A TODOS/////

  router.get("/genres", async function (req, res,next) {
    try {
      const respuesta = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
  
      const genresApi = await respuesta.data.results.map(g => g.name)
      //console.log('estos son los generos: ', genresApi)

      genresApi.map(e => Genres.findOrCreate({ //lo uso para guardar los generos que me traje de la API en la base de datos
          where: {name: e} //
      }))

      const allGenres = await Genres.findAll() //me traigo todos los generos que guarde en mi db
      res.json(allGenres)

  }catch(e) {
      next(e)
  }

})

  ////CREACION DEL VIDEOGAME////

  router.post("/videogame", async function (req, res,next) {
    
    const {name, image, genres, released, rating, platforms, description} = req.body
    //la accion de crear una nueva instancia es asincrona, como manejo errores? con try y catch
    try {
      let repetido = await getAllInfo()
      let comprobar = repetido.filter(el=> el.name.toLowerCase()===name.toLowerCase())
      if(!comprobar.length) {
         let newVideogame = await Videogame.create ({ //le paso al create el objeto con todos los atributos que quiero que tenga mi nuevo videojuego
             name,
             image: image || "https://ceinaseg.com/wp-content/uploads/2021/09/videogames-controller-1920x1080-1.jpg",
             released,
             rating,
             platforms,
             description,
         })
         const relacion = await Genres.findAll({ //en generos, buscame todos aquellos
             where: { //donde
                 name: genres
             }
         })
         await newVideogame.addGenres(relacion) //a mi juego creado, le agrego algun genero
         res.send("Juego creado exitosamente")
        }
         else {
          res.send("El videojuego ya existe")
      }
    
      }catch(e) {
         next(e)
     }
    })

  //////BUSQUEDA POR ID, TRAE A TODOS JUNTOS////


// });
const idApi = async (id) => {
  try {
      const rtaApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      if(rtaApi) {
          const vgId = await rtaApi.data
          const info = {
              id: vgId.id,
              name: vgId.name,
              image: vgId.background_image,
              genres: vgId.genres?.map(g => g.name),
              description: vgId.description_raw,
              released: vgId.released,
              rating: vgId.rating,
              platforms: vgId.platforms?.map(el => el.platform.name)

          }
          return info
      } else {
          return("No hay un videojuego con ese id")
      }

  } catch(e) {
      console.error(e)
  }
}

//A MI DB
const idDb = async (id) => {
  try {
  return await Videogame.findByPk(id, {
      include:[ {
          model: Genres, 
          atributes: ['name'], 
          throught: { 
              attributes: [] 
          }
      }]
     })
  } catch(e) {
      console.error(e)
  }
}

//UNO MIS DOS SOLICITUDES
const videogameid = async (id) => {
  const dbID = id.includes("-")
  if(dbID) { //si mi id contiene un signo "-"
      const vgDb = await idDb(id);
      return vgDb     
  } else {
      const vgApi = await idApi(id);
      return vgApi
 }
}

router.get('/videogame/:id', async (req, res, next) => {
  const {id} = req.params //el id me llega por params
  let data = await videogameid(id)

  try {
      //const getById = await data.(i => i.id == idVideogame)
      data ? res.send(data) : res.status(404).send('El id ingresado no coincide con un videojuego en particular')

  } catch(e) {
      next(e)
  }
})

router.get('/platforms', async (req, res, next) => {
        
  try {
      const all = await getvideogames();
      const allPlatforms = [];
      all.map(g => g.platforms.map(p => {
          if(!allPlatforms.includes(p)) {
              allPlatforms.push(p)
          }
      }))
  
      allPlatforms.length ? res.status(200).json(allPlatforms) : res.status(404).send('Error')

      }catch(e) {
          next(e)
      }
  })

////// BORRAR POR ID

router.delete("/delete/:id", async (req,res)=> {
  const {id}= req.params
  try{
  const borrarvideogme= await Videogame.destroy({
      where:{id:id}})
      res.json({msg: "El videogame con ese id fue eliminado"})
  }catch (error) {("Error en la ruta de eliminacion")}
})

//// BORRAR POR NOMBRE

router.delete('/delete', async (req,res)=>{
  const {name} = req.query;
  try{
      const destruir = await Videogame.destroy({
          where:{name:name}})
          res.send(`El Videogame ${name} fue eliminado`)    
  }
  catch (error) {('error en la ruta')}
  })

/////ACTUALIZAR RATING Y DESCRIPCION BUSCANDO POR NOMBRE

router.put('/updatecard/:id', async ( req,res) => {
        
  try{
  const id = req.params.id
  const {rating,description,name,released,platforms} = req.body
const cambio = await Videogame.update(
      {rating,description,name,released,platforms},
  {where : {id:id}},
  
)
res.status (200).send ("Los datos fueron actualizado")
}
catch (error) {res.status(404).send("No se pudieron actualizar los datos")}
})
// router.put("/updatecard/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const gameupid = await Videogame.findOne({
//       where: {
//         id: id,
//       },
//     });

//     await gameupid.update({
//       name: req.body.name,
//       rating: req.body.rating,
//       released: req.body.released,
//       description: req.body.description,
//       platforms: req.body.platforms,
//     });

//     req.body.genres.forEach(async (e) => {
//       // recorro por los generos que me pasen y los busco en mi base de datos
//       let genderDB = await Genres.findAll({ where: { name: e } });
//       await gameupid.setGenres(genderDB);
//     });

//     res.send(gameupid);
//   } catch (error) {
//     console.log(error);
//   }
// });
module.exports = router;
;