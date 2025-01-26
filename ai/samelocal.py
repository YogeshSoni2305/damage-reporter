def checker(loc1,loc2):
    # loc1 and loc2 are 2 tuples which has two elements first one being latitude
    # and second one being longitude
    # return True if they are same else False
    # return False if they are different else True
    if loc1[0]==loc2[0] and loc1[1]==loc2[1]:
        return True
    else:
        return False   

