public with sharing class AccountHelper{
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(String inputIndustry){
        return [SELECT Id, Name, Industry, Rating
                FROM Account
                WHERE Industry = :inputIndustry
                WITH USER_MODE];
    }

    @AuraEnabled
    public static string updateTickerSymbol(String recordId, String newTickerSymbol){
        Account acc = new Account(
            Id = recordId, 
            TickerSymbol = newTickerSymbol
        );

        try{
            update acc;
            return 'Success';
        } catch (Exception ex){
            return ex.getMessage();
        }
    }

}