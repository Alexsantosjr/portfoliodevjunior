const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars2.githubusercontent.com/u/37197689?s=460&u=eb1fffe75760f2c1c516cecfd82efcf46d334294&v=4",
        name: "Alexandre Santos",
        role: "Dev Junior",
        description: 'Dev Junior, focado aprender o que a de melhor no mundo da tecnologia web. Colaborador da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/alexsantosjr/" },
            { name: "Twitter", url: "https://twitter.com/alexsantosjr/" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/alexsantosjr/" }
        ]
    }


    return res.render("about", { about })
})

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function () {
    console.log("server is running")
})