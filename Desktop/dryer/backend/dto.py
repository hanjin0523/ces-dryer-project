

class InputValue: 
    def __init__(self, temperature, humidity):
        self.temperature = temperature
        self.humidity = humidity

    def get_temperature(self):
        return self.temperature
    
    def set_temperature(self, temperature):
        self.temperature = temperature
    
    def get_humidity(self):
        return self.humidity
    
    def set_humidity(self, humidity):
        self.humidity = humidity



class Operating: 
    def __init__(self, thermic_rays=None, blowing=None, dehumidify=None):
        self.thermic_rays = thermic_rays
        self.blowing = blowing
        self.dehumidify = dehumidify

    def get_thermic_rays(self):
        return self.thermic_rays
    
    def set_thermic_rays(self, thermic_rays):
        self.thermic_rays = thermic_rays
    
    def get_blowing(self):
        return self.blowing
    
    def set_blowing(self, blowing):
        self.blowing = blowing

    def get_dehumidify(self):
        return self.dehumidify
    
    def set_dehumidify(self, dehumidify):
        self.dehumidify = dehumidify
