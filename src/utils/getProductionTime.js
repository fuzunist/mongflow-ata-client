import getWorkingDaysInMonth from "./getWorkingDays";

export default function getProductionTime() {
  const workingDays = getWorkingDaysInMonth();
   console.log("workingDays::", workingDays)
  const productionPerDay = 30; // 1 günde 40 ton üretim var
  const workingHoursPerDay = 24; // 1 günde 24 saat üretim yapılıyor

  const monthlyProductionAmount = workingDays * productionPerDay; //tons
  const monthlyWorkingHours = workingDays * workingHoursPerDay; //hours

  const productionRatePerHour = monthlyProductionAmount / monthlyWorkingHours; // tons/hour

  //    sabit 1 ton ürün için harcanan süreyi döndürecek
  //    ve bizde sipariş top. ton adedi ve saatlik şirket maliyetiyle
  //    çarpıp reçete maliyetiyle toplayınca siparişe ait
  //    toplam maliyet ortaya çıkacak

  return productionRatePerHour;
}
