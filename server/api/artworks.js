const express = require('express')
const router = express.Router()
const { Artwork, Artist, ShopImage, Genre } = require('../db')
const { artistProperties } = require('../constants')

// GET /api/artworks
router.get('/', async (req, res, next) => {
  try {
    const artworks = await Artwork.findAll({include: [Artist, ShopImage, Genre]})
    res.send(artworks)
  }
  catch(err) {
    next(err);
  }
})

// POST /api/artworks
// check if user is admin user prior to using route
router.post('/', async (req, res, next) => {
  try {
    const art = {}
    Object.entries(req.body).forEach(([key, value]) => {
      if (artistProperties.includes(key)) {
        art[key] = value;
      }
    })
    const newArt = await Artwork.create(art, {include: [Artist]});
    if (req.body.artistId) {
      const artist = await Artist.findByPk(req.body.artistId)
      await newArt.setArtist(artist)
    }
    res.status(201).send(newArt);
  }
  catch (err) {
    console.log(err)
    next(err);
  }
})

// GET /api/artworks/:artworkId
router.get('/:artworkId', async (req, res, next) => {
  try {
    const artwork = await Artwork.findByPk(req.params.artworkId, {include: [Artist, ShopImage]})
    res.send(artwork)
  }
  catch(err) {
    next(err);
  }
})

// PUT /api/artworks/:artworkId
// check if user is admin before using this route to change price, etc.
router.put('/:artworkId', async (req, res, next) => {
  try {
    const artwork = await Artwork.findByPk(req.params.artworkId);
    await artwork.update(req.body);
    res.send(artwork);
  }
  catch(err) {
    next(err);
  }
})

// DELETE /api/artworks/:artworkId
// check if user is admin before using this route
router.delete(':/artworkId', async (req, res, next) => {
  try {
    const artToDelete = await Artwork.findByPk(req.params.artworkId);
    await artToDelete.destroy();
    res.sendStatus(204);
  }
  catch(err) {
    next(err);
  }
})
module.exports = router;
