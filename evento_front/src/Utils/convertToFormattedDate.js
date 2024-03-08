function convertToFormattedDate(dateString) {
    const date = new Date(dateString);
  
    const options = {
      weekday: 'short', 
      month: 'short',   
      day: 'numeric',   
      year: 'numeric',
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true    
    };
  
    const formattedDate = date.toLocaleString('en-US', options);
  
    return formattedDate;
  }
  
export default convertToFormattedDate;
  