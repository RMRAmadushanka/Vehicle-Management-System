const systemReg = require('../models/systemReg');
const customerProfile = require('../models/customerProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.route('/register').post((req, res, next)=>{
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const  userType = req.body.userType;
         let systemreg = new systemReg({
            username : req.body.UserName,
            password : hashedPass,
            phone : req.body.phone,
            userType : userType,
            status : req.body.status
        })


         let cProfile = new customerProfile({
                name : req.body.UserName,
                email : "",
                telephone1 : req.body.phone,
                Category : req.body.Category,
                otherCategory : "",
                Brand : req.body.Brand,
                otherBrand :"",
                Salary : req.body.Salary,
                Dream : req.body.dreamVehicle,
                userName : req.body.UserName,
                address : ""
        })

        if(userType == "Customer")
            {
                systemreg.save()
                .then(systemreg =>{
                    
                            cProfile.save()
                            .then(cProfile =>{
                                console.log()
                                res.json({
                                        message:'Customer Added'
                                })
                            }).catch(error=>{
                            res.json({
                                message:'User Name is Already Used'
                            })
                })
                
                }).catch(error=>{
                    res.json({
                        message:'User Name is Already Used'
                    })
                })
    }else{

      systemreg.save()
                .then(systemreg =>{
                    
                    res.json({
                            message:'Customer Added'
                    })
                    
                }).catch(error=>{
                    res.json({
                        message:'User Name is Already Used'
                    })
                })
             }
    })
});

router.route('/login').post((req, res, next) => {
    var username = req.body.UserName;
    var password = req.body.password;

    systemReg.findOne({$or: [{username:username}]}) 
    .then(systemreg =>{
        if(systemreg){
                bcrypt.compare(password, systemreg.password, function(err, result){
                    if(err){
                        res.json({
                            error:err
                        })
                    }
                    if(result){
                         systemReg.find({ username:username , status : 'Approved'})
                            .then(userTypeSearch => res.json({
                                        message:true,
                             }))    
                            .catch(err => res.status(400). res.json({
                                        message:false,
                         }))    
                    }else{
                         res.json({ message: false})    
                    }
                })
        }else{
            res.json({
                message: false
            })
        }
    })
});


router.route('/resetPassword').put((req, res)=>{
       let username = req.body.UserName;
       bcrypt.hash(req.body.CPassword, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
          }
           const password = hashedPass;
           const updatePass={
               password
           }
       const update1 =  systemReg.findOneAndUpdate({username:username},updatePass).then(() => {
            res.status(200).send({status :"Updated password"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
          
    })
});  

router.route("/allCustomers").get(async (req, res) => {
        customerProfile.find()
                .then(Employees => res.json(Employees))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/viewUserProfie/:id").get(async (req, res) => {
        const username = req.params.id;
        customerProfile.find({userName : username})
                .then(Employees => res.json(Employees))
                .catch(err => res.status(400).json('No Data'))
});

router.route('/updateUserProfile/:id').put((req, res)=>{
      
        let name = req.body.name;
        let email = req.body.email;
        let telephone1 = req.body.telephone1;
        let Category = req.body.Category;
        let otherCategory = req.body.otherCategory;
        let Brand = req.body.Brand;
        let otherBrand = req.body.otherBrand;
        let Salary = req.body.Salary;
        let Dream = req.body.Dream;
        let userName = req.params.id;
        let address = req.body.address;

        const updateProfile={
            name, email, telephone1, Category, otherCategory, Brand, otherBrand, Salary, Dream, address
        }
       const update1 =  customerProfile.findOneAndUpdate({userName:userName},updateProfile).then(() => {
            res.status(200).send({status :"Profile password"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
          
})
 
router.route('/registerAdmin').post((req, res, next)=>{
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

       
         let systemreg = new systemReg({
            username : req.body.UserName,
            password : hashedPass,
            phone : req.body.phone,
            userType : req.body.userType,
            status : req.body.status
        })


      systemreg.save()
                .then(systemreg =>{
                    
                    res.json({
                            message:'Customer Added'
                    })
                    
                }).catch(error=>{
                    res.json({
                        message:'User Name is Already Used'
                    })
                })
             
    })
});


router.route('/loginAdmin').post((req, res, next) => {
    var username = req.body.UserName;
    var password = req.body.password;

    systemReg.findOne({$or: [{username:username}]}) 
    .then(systemreg =>{
        if(systemreg){
                bcrypt.compare(password, systemreg.password, function(err, result){
                    if(err){
                        res.json({
                            error:err
                        })
                    }
                    if(result){
                         systemReg.find({ username:username})
                            .then(userTypeSearch => {
                                systemReg.find({status : 'Approved'})
                                    .then(userAdmin => res.json({
                                                message:true,
                                    }))    
                                    .catch(err => res.status(400). res.json({
                                                message:false,
                                }))    
                            })    
                            .catch(err => res.status(400). res.json({
                                        message:false,
                         }))    
                    }else{
                         res.json({ message: false})    
                    }
                })
        }else{
            res.json({
                message: false
            })
        }
    })
});


module.exports = router;