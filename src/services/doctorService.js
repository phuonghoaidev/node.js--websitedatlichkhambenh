import { where } from "sequelize";
import db from "../models/index";

let getTopDoctorHome = async (limitInput) => {
    try {
        const limit = Number.parseInt(limitInput, 10);
        if (!Number.isInteger(limit) || limit <= 0) {
            throw new Error('limit phải là số nguyên dương');
        }

        const users = await db.User.findAll({
            limit,
            where: { roleId: 'R2' },
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: db.Allcode,  as: 'positionData',
                    attributes: ['valueEn', 'valueVi']
                },
                {
                    model: db.Allcode,  as: 'genderData',
                    attributes: ['valueEn', 'valueVi']
                }
            ],
            raw: true,
            nest: true
        });

        return { errCode: 0, data: users };
    } catch (e) {
        console.log('getTopDoctorHome service error:', e);
        throw e;
    }
};


let getAllDoctors = () => {
    return new Promise( async (resolve, reject) => {
        try{
            let doctors = await db.User.findAll({
                where: {roleId: 'R2'},
                attributes: {
                    exclude: ['password', 'image']
                },
            })

            resolve({
                errCode: 0,
                data: doctors
            })
        }catch(e) {
            reject(e)
        }
    })
}

let saveDetailInforDoctor = (inputData) => {
    return new Promise( async (resolve, reject) => {
        try{
            if(!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor succeed!'
                })
            }


        }catch(e) {
            reject(e);
        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor
};
