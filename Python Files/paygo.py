print("Hello, World")
def calculate_instalments(amount, down_payment, period, percent):

    credit=amount-down_payment
    daily_instalment=credit*percent*period

    return daily_instalment


print(calculate_instalments(30000, 5000, 700, 0.20))
    
