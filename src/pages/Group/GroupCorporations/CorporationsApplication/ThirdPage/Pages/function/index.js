export function priceAverage(data){
    switch(data){
        case "8,000원 - 12,000원" :
            return 0
            break;
        case "12,000원 - 15,000원" :
            return 1
            break;
        case "15,000원 - 20,000원" :
            return 2
            break;
        case 0 :
            return "8,000원 - 12,000원"
            break;
        case 1 :
            return "12,000원 - 15,000원"
            break;
        case 2 :
            return "15,000원 - 20,000원"
            break;


    }
}

export function surpportPrice(data){
    switch(data){
        case "없음" :
            return 0
            break;
        case "5,000원":
            return 5000
            break;
        case "6,000원":
            return 6000
            break;
        case "7,000원":
            return 7000
            break;
        case "8,000원":
            return 8000
            break;
        case "9,000원":
            return 9000
            break;
        case "10,000원":
            return 10000
            break;
        case "11,000원":
            return 11000
            break;
        case "12,000원":
            return 12000
            break;
        case "13,000원":
            return 13000
            break;
        case "14,000원":
            return 14000
            break;
        case "15,000원":
            return 15000
            break;
        case "16,000원":
            return 16000
            break;
        case "17,000원":
            return 17000
            break;
        case "18,000원":
            return 18000
            break;
        case "19,000원":
            return 19000
            break;
        case "20,000원 이상":
            return 20000
            break;
        case 0 :
            return "없음"
            break;
        case 5000:
            return "5,000원"
            break;
        case 6000 :
            return "6,000원"
            break;
        case 7000 :
            return "7,000원"
            break;
        case 8000 :
            return "8,000원"
            break;
        case 9000 :
            return "9,000원"
            break;
        case 10000 :
            return "10,000원"
            break;
        case 11000 :
            return "11,000원"
            break;
        case 12000 :
            return "12,000원"
            break;
        case 13000 :
            return "13,000원"
            break;
        case 14000 :
            return "14,000원"
            break;
        case 15000 :
            return "15,000원"
            break;
        case 16000 :
            return "16,000원"
            break;
        case 17000 :
            return "17,000원"
            break;
        case 18000 :
            return "18,000원"
            break;
        case 19000 :
            return "19,000원"
            break;
        case 20000:
            return "20,000원 이상"
            break;
    }
}

