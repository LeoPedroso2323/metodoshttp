const connect = require("../db/connect");
const { getAllUsers } = require("./userController");

module.exports = class eventoController {
  //criação de um evento
  static async createEvento(req, res) {
    const { nome, descricao, data_hora, local, fk_id_organizador } = req.body;

    //validação genérica de todos atributos
    if (!nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    // Construção da query INSERT
    const query = `INSERT INTO evento (nome, descricao, data_hora, local, fk_id_organizador) VALUES (?, ?, ?, ?, ?)`;
    const VALUES = [nome, descricao, data_hora, local, fk_id_organizador];
    try {
      connect.query(query, VALUES, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao criar o evento!" });
        }
        return res.status(201).json({ message: "Evento criado com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  } //Fim do servidor
  //Visualizar todos os eventos cadastros
  static async getAllEventos(req, res) {
    const query = `select * from evento`;

    try{
        connect.query(query, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({error:"Erro ao buscar eventos"});
            }
            return res.status(200).json({message:"Eventos listados com sucesso!", events: results});
        });
    }catch(error){
        console.log("Erro ao executar a query: ", error);
        return res.status(5000).json({error:"Erro inetrno do servidor!"})
    }
  }
  static async updateEvento(req, res) {
    const {id_evento, nome, descricao, data_hora, local, fk_id_organizador } = req.body;
    

    //validação genérica de todos atributos
    if (!id_evento || !nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    // Construção da query INSERT
    const query = `UPDATE evento SET nome=?,descricao=?,data_hora=?,local=?,fk_id_organizador=? WHERE id_evento = ?`;
    const VALUES = [nome, descricao, data_hora, local, fk_id_organizador , id_evento];
    try {
      connect.query(query, VALUES, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao atualizar o evento!" });
        }
        if(results.affectedRows === 0) {
            return res.status(404).json({error: "Erro ao atualizar o evento"})
        }
        return res.status(200).json({ message: "Evento atualizado com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  } //Fim do update
};
