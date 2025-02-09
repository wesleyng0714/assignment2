/* 輸入 Type */
export type BillInput = {
  date: string
  location: string
  tipPercentage: number
  items: BillItem[]
}

type BillItem = SharedBillItem | PersonalBillItem

type CommonBillItem = {
  price: number
  name: string
}

type SharedBillItem = CommonBillItem & {
  isShared: true
}

type PersonalBillItem = CommonBillItem & {
  isShared: false
  person: string
}

/* 輸出 Type */
export type BillOutput = {
  date: string
  location: string
  subTotal: number
  tip: number
  totalAmount: number
  items: PersonItem[]
}

type PersonItem = {
  name: string
  amount: number
}

/* 核心函數 */
export function splitBill(input: BillInput): BillOutput {
  const date = formatDate(input.date);
  const location = input.location;
  const subTotal = calculateSubTotal(input.items);
  const tip = calculateTip(subTotal, input.tipPercentage);
  const totalAmount = subTotal + tip;
  const items = calculateItems(input.items, totalAmount);
  
  return {
      date,
      location,
      subTotal,
      tip,
      totalAmount,
      items,
  };
}

export function formatDate(date: string): string {
  // input format: YYYY-MM-DD, e.g. "2024-03-21"
  // output format: YYYY年M月D日, e.g. "2024年3月21日"

  // 分割日期字串
  const parts = date.split('-');

  // 使用 parseInt 將年份、月份和日期轉換為整數，以去掉前導零。
  let year = parseInt(parts[0]);
  let month = parseInt(parts[1]);
  let day = parseInt(parts[2]);

  // 返回格式化後的字串
  return `${year}年${month}月${day}日`;
}

function calculateSubTotal(items: BillItem[]): number {
  // sum up all the price of the items
}

export function calculateTip(subTotal: number, tipPercentage: number): number {
  // 計算小費
  const tipAmount = subTotal * (tipPercentage / 100);
  
  // 四捨五入到最近的 0.1 元
  return Math.round(tipAmount * 10) / 10;
}


function scanPersons(items: BillItem[]): string[] {
  // scan the persons in the items
}

function calculateItems(
  items: BillItem[],
  tipPercentage: number,
): PersonItem[] {
  let names = scanPersons(items)
  let persons = names.length
  return names.map(name => ({
    name,
    amount: calculatePersonAmount({
      items,
      tipPercentage,
      name,
      persons,
    }),
  }))
}

function calculatePersonAmount(input: {
  items: BillItem[]
  tipPercentage: number
  name: string
  persons: number
}): number {
  // for shared items, split the price evenly
  // for personal items, do not split the price
  // return the amount for the person
}

function adjustAmount(totalAmount: number, items: PersonItem[]): void {
  // adjust the personal amount to match the total amount
}
