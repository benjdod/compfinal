export const numToRisk = (risknumber) => {
    if (risknumber < 0.01)
        return 'Low'
    
    if (risknumber <= 0.05 )
        return 'Medium'

    if (risknumber <= 0.1)
        return 'High'

    return 'Very High'
}