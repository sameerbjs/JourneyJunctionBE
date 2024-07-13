import Travel from "../models/travel.js";

export const travelController = {
    async createTravel(req, res, next) {
        const { description, endDate, endLocation, startDate, startLocation, title, stops, userId, travel_img } = req.body;

        let travel;
        try {
            if (stops?.length === 0) {
                const travelToCreate = new Travel({
                    title: title,
                    description: description,
                    endDate: endDate,
                    endLocation: endLocation,
                    startDate: startDate,
                    startLocation: startLocation,
                    user: userId,
                    travel_img: travel_img
                });
                travel = await travelToCreate.save();
                return res.status(200).send({ travel: travel, created: true });
            } else {
                const travelToCreate = new Travel({
                    title: title,
                    description: description,
                    endDate: endDate,
                    endLocation: endLocation,
                    startDate: startDate,
                    startLocation: startLocation,
                    user: userId,
                    travel_img: travel_img,
                    stops: stops
                });
                travel = await travelToCreate.save();
                return res.status(200).send({ travel: travel, created: true });
            }
        } catch (error) {
            return next(error);
        }
    }
};