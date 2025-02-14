import ResponseModel from "../db/responseObj.js";
import {query, insert} from "../db/db_connection.js";
import moment from 'moment';

const getEvents = async (req, res) => {
    let reqBody=req.query;
    let response={};
    let clause=''
    if(reqBody.date ){
        clause= clause + ` and date = ${reqBody.date}`
    }
    if(reqBody.category){
        clause= clause + ` and category = ${reqBody.category}`
    }
    if(reqBody.location){
        clause= clause +` and location = ${reqBody.location}`
    }
    try {
        var eventList = await query(`SELECT * FROM events where deleted_at IS NULL ${clause}`);
        if(!eventList.status||eventList.response.length==0){
            response = new ResponseModel(false,"ERROR",{message:`Invalid Data`});
        }else{
            response=new ResponseModel(true,'SUCCESS',eventList.response);
        }
    }catch(error){
        response = new ResponseModel(false,"ERROR",{message:`${error.message}`});
    }
    res.status(200).json(response.print());
}

const addEvents = async (req, res) => {
    let reqBody=req.body;
    let response={}
    try {
        var event = await insert(`events`,reqBody);
        if(event.response.insertId){
            response = new ResponseModel(true,"SUCCESS",{message:"Event Created Successfullly"});
        }else{
            response = new ResponseModel(false,"ERROR",{message:`Invalid Data`});
        }
    }catch(error){
        response = new ResponseModel(false,"ERROR",{message:`${error.message}`});
    }
    res.status(200).json(response.print());
}
const updateEvent = async (req, res) => {
    let reqBody=req.body;
    let response={}
    try {
        let updateSMSReport=await updateQuery("events",{title: reqBody.title, description: reqBody.description, date: reqBody.date, category: reqBody.category, location_id: reqBody.location_id},{id:reqBody.id})
        if(updateSMSReport.status){
            response = new ResponseModel(true,"SUCCESS",{message:"Event Updated Successfullly"});
        }else{
            response = new ResponseModel(false,"ERROR",{message:`Invalid Data`});
        }
    }catch(error){
        response = new ResponseModel(false,"ERROR",{message:`${error.message}`});
    }
    res.status(200).json(response.print());
}

const deleteEvent = async (req, res) => {
    let reqBody=req.body;
    let response={}
    try {
        let updateSMSReport=await updateQuery("events",{deleted_at: moment().format('yyyy-mm-dd:hh:mm:ss')},{id:reqBody.id})
        if(updateSMSReport.status){
            response = new ResponseModel(true,"SUCCESS",{message:"Event Deleted Successfullly"});
        }else{
            response = new ResponseModel(false,"ERROR",{message:`Invalid Data`});
        }
    }catch(error){
        response = new ResponseModel(false,"ERROR",{message:`${error.message}`});
    }
    res.status(200).json(response.print());
}

export {
    getEvents,
    addEvents,
    updateEvent,
    deleteEvent
}