
export const shipSizes = [5, 4, 4] // 1 battleship (5 squares), 2 destroyers (4 squares each)
export const initShipCount = shipSizes.reduce((acc, val) => acc + val, 0)
