import express, { Request, Response, Router } from "express";
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
import { getDb } from "../db/conn";
// This will help us connect to the database

import { ObjectId } from "mongodb";
// This help convert the id from string to ObjectId for the _id.

const recordRoutes: Router = express.Router();


// This section will help you get a list of all the records.
recordRoutes.route("./record").get(function (req: Request, res: Response) {
    const db_connect = getDb();
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err: any, result: any) {
            if (err) throw err;
            res.json(result);
        });
});
// This section will help you get a single record by id
recordRoutes.route("./record:id").get(function (req: Request, res: Response) {
    const db_connect = getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    db_connect
      .collection("records")
      .findOne(myquery, function (err: any, result: any) {
        if (err) throw err;
        res.json(result);
      });
  });

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req: Request, res: Response) {
    const db_connect = getDb();
    const myobj = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    db_connect.collection("records").insertOne(myobj, function (err: any, result: any) {
      if (err) throw err;
      res.json(result);
    });
});
  // This section will help you update a record by id.
  recordRoutes.route("/update/:id").post(function (req: Request, res: Response) {
    const db_connect = getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const newvalues = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    db_connect
      .collection("records")
      .updateOne(myquery, newvalues, function (err: any, result: any) {
        if (err) throw err;
        console.log("1 document updated");
        res.json(result);
      });
  });

  recordRoutes.route("/:id").delete(function (req: Request, res: Response) {
    const db_connect = getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    db_connect.collection("records").deleteOne(myquery, function (err: any, obj: any) {
      if (err) throw err;
      console.log("1 document deleted");
      res.json(obj);
    });
  });
  
  export default recordRoutes;
  