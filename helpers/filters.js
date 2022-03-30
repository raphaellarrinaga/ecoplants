import moment from 'moment'

export function filterLeads (filter, leads) {
  let filteredList = [...leads]

  // Filter status
  if (filter.status !== 'all') {
    const filtered = filteredList.filter(lead => lead.Famille === filter.status)
    filteredList = filtered
  }


  function filterMonthRange(obj, obj2) {
    console.log(obj.Semis);
    console.log(obj2);
    // const range = obj.Semis;
    const range = "2-5";
    const start = range.substring(0, range.indexOf('-'));
    const end = range.substring(range.indexOf('-') + 1);

    const months = [];

    if (start < end) {
      for (var i = start; i <= end; i++) {
        months.push(parseInt(i));
      }
    } else {

    }

    const monthsText = months.map((month) => {
      // return month == 2 ? 8 : month;
      switch (month) {
        case 1:
          return "Janvier";
          break;
        case 2:
          return "Février";
          break;
        case 3:
          return "Mars";
          break;
        case 4:
          return "Avril"
          break;
        case 5:
          return "Mai";
          break;
        case 6:
          return "Juin";
          break;
        case 7:
          return "Juillet";
          break;
        case 8:
          return "Août";
          break;
        case 9:
          return "Septembre";
          break;
        case 10:
          return "Octobre";
          break;
        case 11:
          return "Novembre";
          break;
        case 12:
          return "Décembre";
          break;
        default:
          break;
      }
    });
  }

  // Filter status
  if (filter.sow !== 'all') {
    const filtered = filteredList.filter(lead => {
      const range = lead.Semis;
      const start = range.substring(0, range.indexOf('-'));
      const end = range.substring(range.indexOf('-') + 1);

      const months = [];

      if (start < end) {
        for (var i = start; i <= end; i++) {
          months.push(parseInt(i));
        }
      } else {
        for (var i = start; i <= 12; i++) {
          months.push(parseInt(i));
        }
        for (var i = 1; i <= end; i++) {
          months.push(parseInt(i));
        }
      }

      const monthsText = months.map((month) => {
        switch (month) {
          case 1:
            return "Janvier";
            break;
          case 2:
            return "Février";
            break;
          case 3:
            return "Mars";
            break;
          case 4:
            return "Avril"
            break;
          case 5:
            return "Mai";
            break;
          case 6:
            return "Juin";
            break;
          case 7:
            return "Juillet";
            break;
          case 8:
            return "Août";
            break;
          case 9:
            return "Septembre";
            break;
          case 10:
            return "Octobre";
            break;
          case 11:
            return "Novembre";
            break;
          case 12:
            return "Décembre";
            break;
          default:
            break;
        }
      });

      return monthsText.includes(filter.sow)
    })

    filteredList = filtered
  }

  // Search
  if (filter.search !== '') {
    const searchList = []
    const searchTerm = filter.search.toLowerCase()
    for (let i = 0; i < filteredList.length; i++) {
      if (
        (filteredList[i].Nom && filteredList[i].Nom.toLowerCase().includes(searchTerm)) ||
        (filteredList[i].NomVernaculaire && filteredList[i].NomVernaculaire.toLowerCase().includes(searchTerm))
      ) {
        searchList.push(filteredList[i])
      }
    }
    filteredList = searchList
  }

  return filteredList
}

export function orderLeads (order, leads) {
  const orderedList = [...leads]

  if (order === 'createdAt') {
    orderedList.sort(function (a, b) {
      const unixA = moment(a.createdAt).unix()
      const unixB = moment(b.createdAt).unix()
      return unixA < unixB ? -1 : 1
    })
  } else {
    orderedList.sort(function (a, b) {
      const nameA = a[order] ? a[order].toLowerCase() : 'zzz'
      const nameB = b[order] ? b[order].toLowerCase() : 'zzz'
      return nameA < nameB ? -1 : 1
    })
  }

  return orderedList
}
