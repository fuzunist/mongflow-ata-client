export default function getWorkingDaysInMonth() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  
    let workingDays = 0;
  
    for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
      const dayOfWeek = day.getDay();
      
      // Check if the day is not Sunday (0)
      if (dayOfWeek !== 0) {
        workingDays++;
      }
    }
  
    return workingDays;
  }
  

  
