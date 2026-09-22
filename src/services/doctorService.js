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

module.exports = {
    getTopDoctorHome
};
