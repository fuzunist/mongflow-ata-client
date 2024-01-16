export default function limitFloat(number, precision) {

    if (typeof number === 'string') {
        number = parseFloat(number);

        if (isNaN(number)) {
            return 0.00;
          }
      }
    
    const factor = 10 ** precision;
    return Math.round(number * factor) / factor;
  }