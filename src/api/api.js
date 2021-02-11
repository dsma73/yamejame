const reserveData = {}


export function getReservations(date) {
    if( !date )
      return null

    if( !reserveData[date] ) {

      const dayData = [
        {
          time: '10:00',
          reserved:false
        },
        {
          time: '10:30',
          reserved:false
        },
        {
          time: '11:00',
          reserved:false
        },
        {
          time: '11:30',
          reserved:false
        },
        {
          time: '12:00',
          reserved:false
        },
        {
          time: '12:30',
          reserved:false
        } ,       
        {
          time: '01:00',
          reserved:false
        },
        {
          time: '01:30',
          reserved:false
        } ,               
        {
          time: '02:00',
          reserved:false
        } ,               
        {
          time: '02:30',
          reserved:false
        } ,               
        {
          time: '03:00',
          reserved:false
        } ,               
        {
          time: '03:30',
          reserved:false
        } ,               
        {
          time: '04:00',
          reserved:false
        } ,               
        {
          time: '04:30',
          reserved:false
        } ,               
        {
          time: '05:00',
          reserved:false
        } ,               
        {
          time: '05:30',
          reserved:false
        } ,
        {
          time: '06:00',
          reserved:false
        } ,                               
        ]

      reserveData[date] = dayData;
    }

    return reserveData[date]
}

