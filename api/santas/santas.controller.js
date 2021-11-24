const santaModel = require("./santas.model");
const sgMail = require("@sendgrid/mail");

class SantaController {
    constructor() {
        this._costFactor = 4;
    }

    get addTeam() {
        return this._addTeam.bind(this);
    }

    get findSantaName() {
        return this._findSantaName.bind(this);
    }

    get findTeamById() {
        return this._findTeamById.bind(this);
    }

    get addPlayer() {
        return this._addPlayer.bind(this);
    }

    get deletePlayer() {
        return this._deletePlayer.bind(this);
    }

    get getPlayerBeEmail() {
        return this._getPlayerBeEmail.bind(this);
    }

    get startSanta() {
        return this._startSanta.bind(this);
    }

    get deleteTeam() {
        return this._deleteTeam.bind(this);
    }

    async sendMessagesFromSanta(arr, teamName) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        arr.map((item) => {
            const msg = {
                to: item.email,
                from: process.env.SENDGRID_MAIL_SENDER,
                subject: teamName,
                text: "Secret Santa",
                html: `<div>${item.prenestsTo} з команди ${teamName} буде чекати від вас подарунок. <br>А ось підказка для тебе, щоб точно вгадати з вибором <div>${item.helpers}</div></div>`,
            };

            (async () => {
                try {
                    await sgMail.send(msg);
                } catch (error) {
                    console.error("test_err", error);

                    if (error.response) {
                        console.error(error.response.body);
                    }
                }
            })();
        });
    }

    randomGen(maxLimit) {
        return Math.floor(Math.random() * maxLimit);
    }

    generateSnata(arr) {
        let alreadyChosen = [];
        return arr.map((item, index) => {
            let aimInd = index;
            while (aimInd === index) {
                if (
                    index === arr.length - 1 &&
                    !alreadyChosen.includes(arr[index].name)
                ) {
                    const aloneItem = {
                        shouldPlayAgain: true,
                    };
                    return aloneItem;
                }

                aimInd = this.randomGen(arr.length);

                if (aimInd !== index && !alreadyChosen.includes(arr[aimInd].name)) {
                    item.prenestsTo = arr[aimInd].name;
                    item.helpers = arr[aimInd].descr;
                    alreadyChosen.push(arr[aimInd].name);
                } else {
                    aimInd = index;
                }
            }
            return item;
        });
    }

    async _findTeamById(req, res, next) {
        try {
            const {id} = req.params;

            const neededTeam = await santaModel.findById(id);

            if (!neededTeam) {
                return res.status(409).json({
                    message: "Такої команди немає, спробуйте ще раз",
                    status: 0,
                });
            }

            const filteredPlayers = [...neededTeam.players.toObject()].map((item) => {
                 return {
                    ...item,
                    prenestsTo: 'nobody',
                    helpers: 'nothing',
                };
            })

            return res.status(200).json({
                neededTeam: {...neededTeam.toObject(), players: filteredPlayers},
                status: 1
            });
        } catch (error) {
            next(error);
        }
    }

    async _findSantaName(req, res, next) {
        try {
            const {id, email} = req.params;
            const neededTeam = await santaModel.findById(id);
            const santaName = neededTeam.players.find((item) => item.email === email);
            if (!santaName) {
                return res.status(409).json({
                    message: "Нічого не вийшло, перевірте Вашу пошту і спробуйте ще раз",
                });
            }

            const happyName = santaName.prenestsTo;

            return res.status(200).json({
                message: `${happyName} буде чекати від Вас подарунок.<br>Підказка для подарунку - ${santaName.helpers}`,
            });
        } catch (error) {
            next(error);
        }
    }

    async _addPlayer(req, res, next) {
        try {
            const {id} = req.params;
            const {name, email, descr} = req.body;
            const teamToFill = await santaModel.findById(id);
            if (!teamToFill) {
                return res.status(409).json({
                    message: "Такої команди немає, спробуйте ще раз",
                    status: 0,
                });
            }

            const isEmailInUse = teamToFill.players.find((pl) => pl.email === email);
            if (isEmailInUse) {
                return res
                    .status(409)
                    .json({message: "Гравець з таким емейлом вже є", status: 0});
            }
            const isNameInUse = teamToFill.players.find((pl) => pl.name === name);
            if (isNameInUse) {
                return res
                    .status(409)
                    .json({message: "Гравець з таким іменем вже є", status: 0});
            }

            const newPlayer = {name, email, prenestsTo: null, logo: "default", descr};
            const players = [...teamToFill.players, newPlayer];
            const newTeam = await santaModel.findByIdAndUpdate(
                id,
                {players},
                {returnOriginal: false}
            );
            return res.status(200).json({
                team: {
                    name: newTeam.name,
                    id: newTeam._id,
                    limit: newTeam.limit,
                    admin: newTeam.admin,
                    players: newTeam.players,
                    isPlayed: newTeam.isPlayed,
                    status: 1,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async _addTeam(req, res, next) {
        try {
            const {name, limit, admin} = req.body;

            // const isNameExist = await santaModel.findTeamByName(name);

            // if (isNameExist) {
            //   return res.status(409).json({
            //     message: "Така команда вже є, придумайте іншу назву",
            //     status: 0,
            //   });
            // }

            const newTeam = await santaModel.create({
                name,
                limit,
                admin,
                players: [],
            });

            return res.status(201).json({
                team: {
                    id: newTeam._id,
                    name: newTeam.name,
                    admin: newTeam.admin,
                    limit: newTeam.limit,
                    players: newTeam.players,
                    isPlayed: newTeam.isPlayed,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async _deletePlayer(req, res, next) {
        try {
            const {id} = req.params;
            const {idToDelete} = req.body;

            const teamToUpdate = await santaModel.findById(id);
            if (!teamToUpdate) {
                return res.status(409).json({
                    message: "Такої команди немає, спробуйте ще раз",
                    status: 0,
                });
            }

            const players = teamToUpdate.players.filter(
                (item) => item.id !== idToDelete
            );

            const newTeam = await santaModel.findByIdAndUpdate(
                id,
                {players},
                {returnOriginal: false}
            );
            return res.status(200).json({
                team: {
                    id: newTeam._id,
                    name: newTeam.name,
                    admin: newTeam.admin,
                    limit: newTeam.limit,
                    players: newTeam.players,
                    isPlayed: newTeam.isPlayed,
                    status: 1,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async _startSanta(req, res, next) {
        try {
            const {id} = req.params;

            const teamToUpdate = await santaModel.findById(id);
            if (!teamToUpdate) {
                return res.status(409).json({
                    message: "Такої команди немає, спробуйте ще раз",
                    status: 0,
                });
            }

            const {isPlayed, players, name} = teamToUpdate;
            if (isPlayed) {
                return res.status(409).json({
                    message: "Таємний санта вже розіграний, перевірте пошту",
                    status: 0,
                });
            }

            let readyPlayers;
            do {
                readyPlayers = await this.generateSnata(players);
            } while (readyPlayers[readyPlayers.length - 1].shouldPlayAgain);

            await this.sendMessagesFromSanta(readyPlayers, name);

            const newTeam = await santaModel.findByIdAndUpdate(
                id,
                {players: readyPlayers, isPlayed: true},
                // { players: readyPlayers },
                {returnOriginal: false}
            );
            return res.status(200).json({
                message:
                    "Санту розіграно, щоб дізнатись для кого готувати подарунок перевірте пошту, або дізнайтесь відразу тут",
            });
        } catch (error) {
            next(error);
        }
    }

    async _deleteTeam(req, res, next) {
        try {
            const id = req.params.id;
            const result = await santaModel.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).send("Not found");
            }
            console.log(result);
            return res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }

    async _getPlayerBeEmail(req, res, next) {
        const {email} = req.params;
        try {
            const teamWithLink = await santaModel.find({"players.email": email});

            return res.status(200).json({teamWithLink, status: 1});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SantaController();
