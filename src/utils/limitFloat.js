export default function limitFloat(number, precision=2) {

    if (typeof number === 'string') {
        number = parseFloat(number);

        if (isNaN(number)) {
            return 0.00;
          }
      }
    
    const factor = 10 ** precision;
    return Math.round(number * factor) / factor;
  }