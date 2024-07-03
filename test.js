const data = [
    { date: '27/6', value: 1 },
    { date: '27/6', value: 2 },
    { date: '27/6', value: 3 },
    { date: '27/6', value: 4 },
    { date: '27/6', value: 5 },
    { date: '27/6', value: 6 },
    { date: '27/6', value: 7 },
    { date: '27/6', value: 8 },
    { date: '28/6', value: 9 },
    { date: '28/6', value: 10 },
    // Add more data items as needed
  ];
  
    function groupedData(data){ 

    return data.reduce((acc, item) => {
          // Find the group corresponding to the current date
          let group = acc.find(ele => ele.date === item.date);
          
          // If the group doesn't exist, create it
          if (!group) {
              group = { date: item.date, values: [] };
              acc.push(group);
            }
            
            // Add the current item to the group's values array
            group.values.push(item);
            
            return acc;
        }, []);
        
    }
     console.log(groupedData);