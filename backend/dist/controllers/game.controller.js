"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const boardGameList = [
    { title: "Azul", description: "blahdlkfajsdlkf", category: "party" },
    { title: "Dixic", description: "blahdlkfajsdlkf", category: "family" },
    { title: "Splender", description: "blahdlkfajsdlkf", category: "quiz" },
];
const getInMemoryGame = (req, res) => {
    const data = boardGameList;
    res.status(200).json(data);
};
const getGameList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch("https://bgg-json.azurewebsites.net/hot");
    const json = yield data.json();
    res.status(200).json(json);
    return json;
});
exports.default = {
    getInMemoryGame,
    getGameList,
};
