const express = require('express');
const router = express.Router();

const DB = require("./data");

router.get("/teams", (req, res) => {
    if (DB.teams == undefined)
        res.status(200).json({msg: "There are no teams in the database."});
    else
        res.status(200).json(DB.teams);
});

router.get("/teams/:name", (req, res) => {
    let param = req.params.name;
    let result = [];

    for(let i = 0; i < DB.teams.length; i++){
        if (DB.teams[i]["name"].indexOf(param) > -1){
            result.push(DB.teams[i]);
        }
    }

    if (result.length > 0)
        res.status(200).json(result);
    else 
        res.status(404).json({msg: "No teams were found."});
});

router.get("/teams/id/:id", (req, res) => {
    let id = req.params.id;

    result = DB.teams.find((t) => t.id == id);

    if (result != undefined)
        res.status(200).json(result);
    else 
        res.status(404).json({msg: "No teams were found."});
});

router.post("/teams", (req, res) => {
    let {
        name,
        city,
        state,
        series,
        titles,
        paycheck
    } = req.body;

    if (name == undefined)
        res.status(400).json({msg: "Team name must not be empty."});
    else if (city == undefined)
        res.status(400).json({msg: "Team city must not be empty."});
    else if (state == undefined)
        res.status(400).json({msg: "Team state must not be empty."});
    else if (series != undefined && series != "A" && series != "B" && series != "C" && series != "")
        res.status(400).json({msg: "Team series must be either A, B, C or empty."})
    else if (titles == undefined)
        res.status(400).json({msg: "Team titles must be an integer and not be empty."});
    else if (titles[0] == undefined || titles[0].state == undefined || isNaN(titles[0].state))
        res.status(400).json({msg: "Team state titles must be an integer and not be empty."});
    else if (titles[1] == undefined || titles[1].national == undefined || isNaN(titles[1].national))
        res.status(400).json({msg: "Team national titles must be an integer and not be empty."});
    else if (titles[2] == undefined || titles[2].international == undefined || isNaN(titles[2].international))
    res.status(400).json({msg: "Team international titles must not be empty"});
    else if (paycheck == undefined)
        res.status(400).json({msg: "Team paycheck must not be empty."});
    else if (isNaN(paycheck))
        res.status(400).json({msg: "Invalid value for paycheck."});
    else{
        if (series == undefined) series = "";

        id = DB.teams[DB.teams.length-1].id + 1;

        DB.teams.push({
            id,
            name,
            city,
            state,
            series,
            titles,
            paycheck
        });
        res.status(200).json({msg: "Team successfully added."});
    }
});

router.put("/teams/:id", (req, res) => {
    let id = req.params.id;

    if (isNaN(id))
        res.status(400).json({msg: "Invalid ID!"});
    else {
        let {
            name,
            city,
            state,
            series,
            titles,
            paycheck
        } = req.body;
        let team = DB.teams.find((t) => t.id == id);
        
        if (team != undefined){
            let err = false;

            if (titles != undefined) {
                for (let i = 0; i < titles.length; i++){
                    if (titles[i].state != undefined){
                        if (isNaN(titles[i].state)){
                            err = true;
                            res.status(400).json({msg: "Team state titles must be an integer."});
                        }
                        else titles.state = titles[i].state;
                    }
                    else if (titles[i].national != undefined){
                        if (isNaN(titles[i].national)){
                            err = true;
                            res.status(400).json({msg: "Team national titles must be an integer."});
                        }
                        else titles.national = titles[i].national;
                    }
                    else if (titles[i].international != undefined){
                        if (isNaN(titles[i].international)){
                            err = true;
                            res.status(400).json({msg: "Team international titles must be an integer."});
                        }
                        else titles.international = titles[i].international;
                    }
                }
            }
            
            if (series != undefined && series != "A" && series != "B" && series != "C" && series != ""){
                err = true;
                res.status(404).json({msg: "Team series must be either A, B, C or empty."});
            }
                

            if (paycheck != undefined && isNaN(paycheck)) {
                err = true;
                res.status(400).json({msg: "Paycheck must be an integer value."})
            }

            if (!err) {
                if (name != undefined) team.name = name;
                if (city != undefined) team.city = city;
                if (state != undefined) team.state = state;
                if (series != undefined) team.series = series;
                if (titles.state != undefined) team.titles[0].state = titles.state;
                if (titles.national != undefined) team.titles[1].national = titles.national;
                if (titles.international != undefined) team.titles[2].international = titles.international;
                if (paycheck != undefined) team.paycheck = paycheck;

                res.status(200).json({msg: "Team successfully updated.", team})
            }
        }
        else{
            res.status(404).json({msg: "Team not found."})
        }
    }
});

router.delete("/teams/:id", (req, res) => {
    let id = req.params.id;
    if (isNaN(id))
        res.status(400).json({msg: "Invalid ID!"});
    else {
        id = parseInt(id);
        teamIndex = DB.teams.findIndex((t) => t.id == id);

        if (teamIndex == -1)
            res.status(404).json({msg: "Team not found."});
        else {
            DB.teams.splice(teamIndex, 1);
            res.status(200).json({msg: "Team successfully removed."});
        }
    }
});

module.exports = router;