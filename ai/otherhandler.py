def handler(description):
    # description here is the text description of the damage report given
    # by the user
    potlist=['pothole','road','damage','hole','crack',"Cavity", "Crater", "Hole", "Pit", "Depression", "Hollow", 
    "Indentation", "Rut", "Ditch", "Sinkhole", "Fissure", "Gully", 
    "Chasm", "Crevice", "Abrasion", "Break", "Crack", "Gap", 
    "Divot", "Erosion"]
    railist=['rail','railway','track','damage','crack', "Railroad", "Train Tracks", "Rail Line", "Trackway", "Rail System", 
    "Metro", "Subway", "Tramway", "Monorail", "Commuter Rail", "Light Rail", 
    "Rail Network", "Overground", "Underground", "High-Speed Rail", "Freight Line", 
    "Rail Corridor", "Streetcar Line", "Transport Line", "Iron Road"
]
    lightlist=['street','light','damage','broken',"Lamp Post", "Streetlamp", "Light Post", "Road Lamp", "Street Lantern", 
    "Outdoor Light", "Highway Light", "Boulevard Light", "Overhead Light", 
    "Light Pole", "Street Illuminator", "Roadside Lamp", "Public Lighting", 
    "Pedestrian Light", "Pathway Light", "Pole Light", "Urban Light", 
    "Park Light", "Area Light", "Utility Light"]
    drainlist=['drain','damage','block',"Sewer System", "Stormwater System", "Watercourse", "Runoff System", 
    "Channeling", "Ditch", "Gutter", "Outlet", "Sewage System", 
    "Effluent Pathway", "Irrigation", "Drain System", "Water Drain", 
    "Pipeline", "Culvert", "Aqueduct", "Storm Drain", "Catchment System", 
    "Drainpipe", "Outfall"]
    for i in potlist:
        if potlist[i] in description:
            return "pothole"
    for i in railist:
        if ralisit[i] in description:
            return "railway"
    for i in lightlist:
        if lightlist[i] in description:
            return "light"
    for i in drainlist:
        if drainlist[i] in description:
            return "drain"

print(handler(description))