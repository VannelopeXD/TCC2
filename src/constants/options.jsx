export const SelectTravelesList=[
    {
        id:1,
        title:'Viajante Solo',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'Casal',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Familia',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Amigos',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10 People'
    },
]


export const SelectBudgetOptions=[
    {
        id:1,
        title:'Barato',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderado',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxo',
        desc:'Dont worry about cost',
        icon:'💸',
    },
]


export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. Give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions, and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, Place address, ticket Pricing, and Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format. Respond in Portuguese.'
