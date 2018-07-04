/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
/* jslint esversion: 6 */
'use strict';

module.exports = function (enums) {
    const module = {};

    const homeeEnums = enums;

    const forbiddenCharacters = /[\]\[*,;'"`<>\\\s?]/g;

    const profileTypeMap = {};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileNone] = {name: "None", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileHomee] = {name: "Homee", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileOnOffPlug] = {name: "OnOffPlug", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableMeteringSwitch] = {name: "DimmableMeteringSwitch", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMeteringSwitch] = {name: "MeteringSwitch", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMeteringPlug] = {name: "MeteringPlug", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmablePlug] = {name: "DimmablePlug", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableSwitch] = {name: "DimmableSwitch", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileOnOffSwitch] = {name: "OnOffSwitch", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDoubleOnOffSwitch] = {name: "DoubleOnOffSwitch", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableMeteringPlug] = {name: "DimmableMeteringPlug", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileOneButtonRemote] = {name: "OneButtonRemote", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileBinaryInput] = {name: "BinaryInput", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableColorMeteringPlug] = {name: "DimmableColorMeteringPlug", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDoubleBinaryInput] = {name: "DoubleBinaryInput", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileTwoButtonRemote] = {name: "TwoButtonRemote", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileThreeButtonRemote] = {name: "ThreeButtonRemote", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileFourButtonRemote] = {name: "FourButtonRemote", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileAlarmSensor] = {name: "AlarmSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDoubleOnOffPlug] = {name: "DoubleOnOffPlug", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileOnOffSwitchWithBinaryInput] = {name: "OnOffSwitchWithBinaryInput", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileWatchDogWithPressureAndTemperatures] = {name: "WatchDogWithPressureAndTemperatures", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileFibaroButton] = {name: "FibaroButton", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileEnergyMeter] = {name: "EnergyMeter", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDoubleMeteringSwitch] = {name: "DoubleMeteringSwitch", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileFibaroSwipe] = {name: "FibaroSwipe", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileBrightnessSensor] = {name: "BrightnessSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableColorLight] = {name: "DimmableColorLight", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableExtendedColorLight] = {name: "DimmableExtendedColorLight", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableColorTemperatureLight] = {name: "DimmableColorTemperatureLight", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableLight] = {name: "DimmableLight", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableLightWithBrightnessSensor] = {name: "DimmableLightWithBrightnessSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableLightWithBrightnessAndPresenceSensor] = {name: "DimmableLightWithBrightnessAndPresenceSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableLightWithPresenceSensor] = {name: "DimmableLightWithPresenceSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDimmableRGBWLight] = {name: "DimmableRGBWLight", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileOpenCloseSensor] = {name: "OpenCloseSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileWindowHandle] = {name: "WindowHandle", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileShutterPositionSwitch] = {name: "ShutterPositionSwitch", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileOpenCloseAndTemperatureSensor] = {name: "OpenCloseAndTemperatureSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileElectricMotorMeteringSwitch] = {name: "ElectricMotorMeteringSwitch", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileOpenCloseWithTemperatureAndBrightnessSensor] = {name: "OpenCloseWithTemperatureAndBrightnessSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileElectricMotorMeteringSwitchWithoutSlatPosition] = {name: "ElectricMotorMeteringSwitchWithoutSlatPosition", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileLock] = {name: "Lock", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileWindowHandleWithButtons] = {name: "WindowHandleWithButtons", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileWindowHandleWithButtonsAndTemperatureAndHumiditySensor] = {name: "WindowHandleWithButtonsAndTemperatureAndHumiditySensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileTemperatureAndHumiditySensor] = {name: "TemperatureAndHumiditySensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileCO2Sensor] = {name: "CO2Sensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileRoomThermostat] = {name: "RoomThermostat", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileRoomThermostatWithHumiditySensor] = {name: "RoomThermostatWithHumiditySensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileBinaryInputWithTemperatureSensor] = {name: "BinaryInputWithTemperatureSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileRadiatorThermostat] = {name: "RadiatorThermostat", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileTemperatureSensor] = {name: "TemperatureSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileHumiditySensor] = {name: "HumiditySensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileWaterValve] = {name: "WaterValve", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileWaterMeter] = {name: "WaterMeter", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileWeatherStation] = {name: "WeatherStation", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileNetatmoMainModule] = {name: "NetatmoMainModule", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileNetatmoOutdoorModule] = {name: "NetatmoOutdoorModule", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileNetatmoIndoorModule] = {name: "NetatmoIndoorModule", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileNetatmoRainModule] = {name: "NetatmoRainModule", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileCosiThermChannel] = {name: "CosiThermChannel", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileNestThermostatWithCooling] = {name: "NestThermostatWithCooling", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileNestThermostatWithHeating] = {name: "NestThermostatWithHeating", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileNestThermostatWithHeatingAndCooling] = {name: "NestThermostatWithHeatingAndCooling", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileNetatmoWindModule] = {name: "NetatmoWindModule", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileElectricalHeating] = {name: "ElectricalHeating", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileValveDrive] = {name: "ValveDrive", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileCamera] = {name: "Camera", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileCameraWithFloodlight] = {name: "CameraWithFloodlight", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileNetatmoTags] = {name: "NetatmoTags", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMotionDetectorWithTemperatureBrightnessAndHumiditySensor] = {name: "MotionDetectorWithTemperatureBrightnessAndHumiditySensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMotionDetector] = {name: "MotionDetector", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileSmokeDetector] = {name: "SmokeDetector", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileFloodDetector] = {name: "FloodDetector", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfilePresenceDetector] = {name: "PresenceDetector", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMotionDetectorWithTemperatureAndBrightnessSensor] = {name: "MotionDetectorWithTemperatureAndBrightnessSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileSmokeDetectorWithTemperatureSensor] = {name: "SmokeDetectorWithTemperatureSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileFloodDetectorWithTemperatureSensor] = {name: "FloodDetectorWithTemperatureSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileWatchDogDevice] = {name: "WatchDogDevice", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileLAG] = {name: "LAG", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileOWU] = {name: "OWU", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileEurovac] = {name: "Eurovac", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileOWWG3] = {name: "OWWG3", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileEuropress] = {name: "Europress", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMinimumDetector] = {name: "MinimumDetector", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMaximumDetector] = {name: "MaximumDetector", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileSmokeDetectorAndCODetector] = {name: "SmokeDetectorAndCODetector", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileSiren] = {name: "Siren", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMotionDetectorWithOpenCloseTemperatureAndBrightnessSensor] = {name: "MotionDetectorWithOpenCloseTemperatureAndBrightnessSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMotionDetectorWithBrightness] = {name: "MotionDetectorWithBrightness", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDoorbell] = {name: "Doorbell", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileSmokeDetectorAndSiren] = {name: "SmokeDetectorAndSiren", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileFloodDetectorWithTemperatureAndHumiditySensor] = {name: "FloodDetectorWithTemperatureAndHumiditySensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMinimumDetectorWithTemperatureSensor] = {name: "MinimumDetectorWithTemperatureSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileMaximumDetectorWithTemperatureSensor] = {name: "MaximumDetectorWithTemperatureSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfilePresenceDetectorWithTemperatureAndBrightnessSensor] = {name: "PresenceDetectorWithTemperatureAndBrightnessSensor", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileCODetector] = {name: "CODetector", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaAlarmSystem] = {name: "InovaAlarmSystem", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaDetector] = {name: "InovaDetector", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaSiren] = {name: "InovaSiren", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaCommand] = {name: "InovaCommand", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaTransmitter] = {name: "InovaTransmitter", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaReciever] = {name: "InovaReciever", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaKoala] = {name: "InovaKoala", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaInternalTransmitter] = {name: "InovaInternalTransmitter", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaControlPanel] = {name: "InovaControlPanel", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaInputOutputExtension] = {name: "InovaInputOutputExtension", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaMotionDetectorWithVOD] = {name: "InovaMotionDetectorWithVOD", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileInovaMotionDetector] = {name: "InovaMotionDetector", roleDetail: "sensor"};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileWashingMachine] = {name: "WashingMachine", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileTumbleDryer] = {name: "TumbleDryer", roleDetail: ""};
    profileTypeMap[homeeEnums.CANodeProfile.CANodeProfileDishwasher] = {name: "Dishwasher", roleDetail: ""};

    module.getNodeName = function (node) {
        if (profileTypeMap[node.profile]) {
            return profileTypeMap[node.profile].name + '-' + ((node.id === -1) ? 0 : node.id);
        }
        else {
            return 'Unknown-' + ((node.id === -1) ? 0 : node.id);
        }
    };

    const attributeTypeMap = {};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNone] = {name: "None", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeOnOff] = {name: "OnOff", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeDimmingLevel] = {name: "DimmingLevel", roleDetail: ".dimmer"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCurrentEnergyUse] = {name: "CurrentEnergyUse", roleDetail: ".power.consumption"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAccumulatedEnergyUse] = {name: "AccumulatedEnergyUse", roleDetail: ".power.consumption"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTemperature] = {name: "Temperature", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTargetTemperature] = {name: "TargetTemperature", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeRelativeHumidity] = {name: "RelativeHumidity", roleDetail: ".humidity"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeBatteryLevel] = {name: "BatteryLevel", roleDetail: ".battery"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeStatusLED] = {name: "StatusLED", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeWindowPosition] = {name: "WindowPosition", roleDetail: ".window"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeBrightness] = {name: "Brightness", roleDetail: ".brightness"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeFloodAlarm] = {name: "FloodAlarm", roleDetail: ".alarm.flood"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSiren] = {name: "Siren", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeOpenClose] = {name: "OpenClose", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypePosition] = {name: "Position", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSmokeAlarm] = {name: "SmokeAlarm", roleDetail: ".alarm.fire"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeBlackoutAlarm] = {name: "BlackoutAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCurrentValvePosition] = {name: "CurrentValvePosition", roleDetail: ".valve"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeBinaryInput] = {name: "BinaryInput", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCO2Level] = {name: "CO2Level", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypePressure] = {name: "Pressure", roleDetail: ".pressure"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeColor] = {name: "Color", roleDetail: ".color.rgb"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSaturation] = {name: "Saturation", roleDetail: ".color.saturation"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMotionAlarm] = {name: "MotionAlarm", roleDetail: ".alarm.secure"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMotionSensitivity] = {name: "MotionSensitivity", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMotionInsensitivity] = {name: "MotionInsensitivity", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMotionAlarmCancelationDelay] = {name: "MotionAlarmCancelationDelay", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeWakeUpInterval] = {name: "WakeUpInterval", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTamperAlarm] = {name: "TamperAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLinkQuality] = {name: "LinkQuality", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmSystemState] = {name: "InovaAlarmSystemState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmGroupState] = {name: "InovaAlarmGroupState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmIntrusionState] = {name: "InovaAlarmIntrusionState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmErrorState] = {name: "InovaAlarmErrorState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmDoorState] = {name: "InovaAlarmDoorState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmExternalSensor] = {name: "InovaAlarmExternalSensor", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeButtonState] = {name: "ButtonState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHue] = {name: "Hue", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeColorTemperature] = {name: "ColorTemperature", roleDetail: ".color.temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHardwareRevision] = {name: "HardwareRevision", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeFirmwareRevision] = {name: "FirmwareRevision", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSoftwareRevision] = {name: "SoftwareRevision", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLEDState] = {name: "LEDState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLEDStateWhenOn] = {name: "LEDStateWhenOn", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLEDStateWhenOff] = {name: "LEDStateWhenOff", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHighTemperatureAlarm] = {name: "HighTemperatureAlarm", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHighTemperatureAlarmTreshold] = {name: "HighTemperatureAlarmTreshold", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLowTemperatureAlarm] = {name: "LowTemperatureAlarm", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLowTemperatureAlarmTreshold] = {name: "LowTemperatureAlarmTreshold", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTamperSensitivity] = {name: "TamperSensitivity", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTamperAlarmCancelationDelay] = {name: "TamperAlarmCancelationDelay", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeBrightnessReportInterval] = {name: "BrightnessReportInterval", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTemperatureReportInterval] = {name: "TemperatureReportInterval", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMotionAlarmIndicationMode] = {name: "MotionAlarmIndicationMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLEDBrightness] = {name: "LEDBrightness", roleDetail: ".dimmer"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTamperAlarmIndicationMode] = {name: "TamperAlarmIndicationMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSwitchType] = {name: "SwitchType", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTemperatureOffset] = {name: "TemperatureOffset", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAccumulatedWaterUse] = {name: "AccumulatedWaterUse", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAccumulatedWaterUseLastMonth] = {name: "AccumulatedWaterUseLastMonth", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCurrentDate] = {name: "CurrentDate", roleDetail: ".date"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLeakAlarm] = {name: "LeakAlarm", roleDetail: ".alarm.flood"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeBatteryLowAlarm] = {name: "BatteryLowAlarm", roleDetail: "indicator.lowbat"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMalfunctionAlarm] = {name: "MalfunctionAlarm", roleDetail: "indicator.maintenance"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLinkQualityAlarm] = {name: "LinkQualityAlarm", roleDetail: "indicator.maintenance"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMode] = {name: "Mode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCalibration] = {name: "Calibration", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypePresenceAlarm] = {name: "PresenceAlarm", roleDetail: ".sensor.alarm.secure"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMinimumAlarm] = {name: "MinimumAlarm", roleDetail: ".min"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMaximumAlarm] = {name: "MaximumAlarm", roleDetail: ".max"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeOilAlarm] = {name: "OilAlarm", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeWaterAlarm] = {name: "WaterAlarm", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmInhibition] = {name: "InovaAlarmInhibition", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmEjection] = {name: "InovaAlarmEjection", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmCommercialRef] = {name: "InovaAlarmCommercialRef", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmSerialNumber] = {name: "InovaAlarmSerialNumber", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeRadiatorThermostatSummerMode] = {name: "RadiatorThermostatSummerMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmOperationMode] = {name: "InovaAlarmOperationMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAutomaticMode] = {name: "AutomaticMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypePollingInterval] = {name: "PollingInterval", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeFeedTemperature] = {name: "FeedTemperature", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeDisplayOrientation] = {name: "DisplayOrientation", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeManualOperation] = {name: "ManualOperation", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeDeviceTemperature] = {name: "DeviceTemperature", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSonometer] = {name: "Sonometer", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAirPressure] = {name: "AirPressure", roleDetail: ".pressure"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmAntimask] = {name: "InovaAlarmAntimask", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmBackupSupply] = {name: "InovaAlarmBackupSupply", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeRainFall] = {name: "RainFall", roleDetail: ".precipitation"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmGeneralHomeCommand] = {name: "InovaAlarmGeneralHomeCommand", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmAlert] = {name: "InovaAlarmAlert", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmSilentAlert] = {name: "InovaAlarmSilentAlert", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmPreAlarm] = {name: "InovaAlarmPreAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmDeterrenceAlarm] = {name: "InovaAlarmDeterrenceAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmWarning] = {name: "InovaAlarmWarning", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaAlarmFireAlarm] = {name: "InovaAlarmFireAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeUpTime] = {name: "UpTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeDownTime] = {name: "DownTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeShutterBlindMode] = {name: "ShutterBlindMode", roleDetail: ".blind"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeShutterSlatPosition] = {name: "ShutterSlatPosition", roleDetail: ".tilt"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeShutterSlatTime] = {name: "ShutterSlatTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeRestartDevice] = {name: "RestartDevice", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSoilMoisture] = {name: "SoilMoisture", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeWaterPlantAlarm] = {name: "WaterPlantAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMistPlantAlarm] = {name: "MistPlantAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeFertilizePlantAlarm] = {name: "FertilizePlantAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCoolPlantAlarm] = {name: "CoolPlantAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHeatPlantAlarm] = {name: "HeatPlantAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypePutPlantIntoLightAlarm] = {name: "PutPlantIntoLightAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypePutPlantIntoShadeAlarm] = {name: "PutPlantIntoShadeAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeColorMode] = {name: "ColorMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTargetTemperatureLow] = {name: "TargetTemperatureLow", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTargetTemperatureHigh] = {name: "TargetTemperatureHigh", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHVACMode] = {name: "HVACMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAway] = {name: "Away", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHVACState] = {name: "HVACState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHasLeaf] = {name: "HasLeaf", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSetEnergyConsumption] = {name: "SetEnergyConsumption", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCOAlarm] = {name: "COAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeRestoreLastKnownState] = {name: "RestoreLastKnownState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLastImageReceived] = {name: "LastImageReceived", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeUpDown] = {name: "UpDown", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeRequestVOD] = {name: "RequestVOD", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaDetectorHistory] = {name: "InovaDetectorHistory", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSurgeAlarm] = {name: "SurgeAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLoadAlarm] = {name: "LoadAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeOverloadAlarm] = {name: "OverloadAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeVoltageDropAlarm] = {name: "VoltageDropAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeShutterOrientation] = {name: "ShutterOrientation", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeOverCurrentAlarm] = {name: "OverCurrentAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSirenMode] = {name: "SirenMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAlarmAutoStopTime] = {name: "AlarmAutoStopTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeWindSpeed] = {name: "WindSpeed", roleDetail: ".wind.speed"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeWindDirection] = {name: "WindDirection", roleDetail: ".wind.direction"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeComfortTemperature] = {name: "ComfortTemperature", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeEcoTemperature] = {name: "EcoTemperature", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeReduceTemperature] = {name: "ReduceTemperature", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeProtectTemperature] = {name: "ProtectTemperature", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaSystemTime] = {name: "InovaSystemTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaCorrespondentProtocol] = {name: "InovaCorrespondentProtocol", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaCorrespondentID] = {name: "InovaCorrespondentID", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaCorrespondentListen] = {name: "InovaCorrespondentListen", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaCorrespondentNumber] = {name: "InovaCorrespondentNumber", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaCallCycleFireProtection] = {name: "InovaCallCycleFireProtection", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaCallCycleIntrusion] = {name: "InovaCallCycleIntrusion", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaCallCycleTechnicalProtect] = {name: "InovaCallCycleTechnicalProtect", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaCallCycleFaults] = {name: "InovaCallCycleFaults", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaCallCycleDeterrence] = {name: "InovaCallCycleDeterrence", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaCallCyclePrealarm] = {name: "InovaCallCyclePrealarm", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaPSTNRings] = {name: "InovaPSTNRings", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaDoubleCallRings] = {name: "InovaDoubleCallRings", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaPIN] = {name: "InovaPIN", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaPUK] = {name: "InovaPUK", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeInovaMainMediaSelection] = {name: "InovaMainMediaSelection", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeRainFallLastHour] = {name: "RainFallLastHour", roleDetail: ".precipitation.hour"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeRainFallToday] = {name: "RainFallToday", roleDetail: ".precipitation.today"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeIdentificationMode] = {name: "IdentificationMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeButtonDoubleClick] = {name: "ButtonDoubleClick", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSirenTriggerMode] = {name: "SirenTriggerMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeUV] = {name: "UV", roleDetail: ".uv"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSlatSteps] = {name: "SlatSteps", roleDetail: ".tilt"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeEcoModeConfig] = {name: "EcoModeConfig", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeButtonLongRelease] = {name: "ButtonLongRelease", roleDetail: "button.long"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeVisualGong] = {name: "VisualGong", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAcousticGong] = {name: "AcousticGong", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSurveillanceOnOff] = {name: "SurveillanceOnOff", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoCameraURL] = {name: "NetatmoCameraURL", roleDetail: "url.cam"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSdState] = {name: "SdState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAdapterState] = {name: "AdapterState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoHome] = {name: "NetatmoHome", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoPerson] = {name: "NetatmoPerson", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoLastEventPersonId] = {name: "NetatmoLastEventPersonId", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoLastEventTime] = {name: "NetatmoLastEventTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoLastEventType] = {name: "NetatmoLastEventType", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoLastEventIsKnownPerson] = {name: "NetatmoLastEventIsKnownPerson", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoLastEventIsArrival] = {name: "NetatmoLastEventIsArrival", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypePresenceTimeout] = {name: "PresenceTimeout", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeKnownPersonPresence] = {name: "KnownPersonPresence", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeUnknownPersonPresence] = {name: "UnknownPersonPresence", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCurrent] = {name: "Current", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeFrequency] = {name: "Frequency", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeVoltage] = {name: "Voltage", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypePresenceAlarmCancelationDelay] = {name: "PresenceAlarmCancelationDelay", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypePresenceAlarmDetectionDelay] = {name: "PresenceAlarmDetectionDelay", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypePresenceAlarmThreshold] = {name: "PresenceAlarmThreshold", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoThermostatMode] = {name: "NetatmoThermostatMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoRelayBoilerConnected] = {name: "NetatmoRelayBoilerConnected", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoRelayMac] = {name: "NetatmoRelayMac", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoThermostatModeTimeout] = {name: "NetatmoThermostatModeTimeout", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoThermostatNextChange] = {name: "NetatmoThermostatNextChange", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeNetatmoThermostatPrograms] = {name: "NetatmoThermostatPrograms", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHomeeMode] = {name: "HomeeMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeColorWhite] = {name: "ColorWhite", roleDetail: ".color.white"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMovementAlarm] = {name: "MovementAlarm", roleDetail: ".alarm.secure"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeMovementSensitivity] = {name: "MovementSensitivity", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeVibrationAlarm] = {name: "VibrationAlarm", roleDetail: ".alarm"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeVibrationSensitivity] = {name: "VibrationSensitivity", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAverageEnergyUse] = {name: "AverageEnergyUse", roleDetail: ".power.consumption"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeBinaryInputMode] = {name: "BinaryInputMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeDeviceStatus] = {name: "DeviceStatus", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeDeviceRemainingTime] = {name: "DeviceRemainingTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeDeviceStartTime] = {name: "DeviceStartTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeDeviceProgram] = {name: "DeviceProgram", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeButtonPressed3Times] = {name: "ButtonPressed3Times", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeButtonPressed4Times] = {name: "ButtonPressed4Times", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeButtonPressed5Times] = {name: "ButtonPressed5Times", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeRepeaterMode] = {name: "RepeaterMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAutoOffTime] = {name: "AutoOffTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeGustSpeed] = {name: "GustSpeed", roleDetail: ".wind.gust.speed"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeGustDirection] = {name: "GustDirection", roleDetail: ".wind.gust.direction"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeLockState] = {name: "TypeLockState", roleDetail: ".lock"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAeotecSmartPlugLEDState] = {name: "AeotecSmartPlugLEDState", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAlarmDuration] = {name: "AlarmDuration", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeDewPoint] = {name: "DewPoint", roleDetail: ".temperature.dewpoint"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeGesture] = {name: "Gesture", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeGestureSequenceLearningMode] = {name: "GestureSequenceLearningMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeGestureSequence] = {name: "GestureSequence", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTotalCurrentEnergyUse] = {name: "TotalCurrentEnergyUse", roleDetail: ".power.consumption"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeTotalAccumulatedEnergyUse] = {name: "TotalAccumulatedEnergyUse", roleDetail: ".power.consumption"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSunsetTime] = {name: "SunsetTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeSunriseTime] = {name: "SunriseTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCurrentLocalWeatherCondition] = {name: "CurrentLocalWeatherCondition", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCurrentLocalTemperature] = {name: "CurrentLocalTemperature", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCurrentLocalHumidity] = {name: "CurrentLocalHumidity", roleDetail: ".humidity"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeForecastLocalWeatherCondition] = {name: "ForecastLocalWeatherCondition", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeForecastLocalTempMin] = {name: "ForecastLocalTempMin", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeForecastLocalTempMax] = {name: "ForecastLocalTempMax", roleDetail: ".temperature"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeArmed] = {name: "Armed", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeFloodlight] = {name: "Floodlight", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHumanDetected] = {name: "HumanDetected", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeVehicleDetected] = {name: "VehicleDetected", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeAnimalDetected] = {name: "AnimalDetected", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeVacationMode] = {name: "VacationMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeBlinkInterval] = {name: "BlinkInterval", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeOtherMotionDetected] = {name: "MotionDetected", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeIRCodeNumber] = {name: "IRCodeNumber", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeHeatingMode] = {name: "HeatingMode", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeDisplayAutoOffTime] = {name: "DisplayAutoOffTime", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeBacklight] = {name: "Backlight", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeOpenWindowDetectionSensibility] = {name: "OpenWindowDetectionSensibility", roleDetail: ""};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCurrentLocalWindSpeed] = {name: "CurrentLocalWindSpeed", roleDetail: ".wind.speed"};
    attributeTypeMap[homeeEnums.CAAttributeType.CAAttributeTypeCurrentLocalGustSpeed] = {name: "CurrentLocalGustSpeed", roleDetail: ".wind.gust"};

    module.mapAttributeProperties = function (node_name, attribute) {
        const common = {};

        if (attributeTypeMap[attribute.type]) {
            common.id = attributeTypeMap[attribute.type].name + '-' + attribute.id;
            common.name = node_name + '.' + attributeTypeMap[attribute.type].name;
        }
        else {
            common.id = 'Unknown-' + attribute.id;
            common.name = node_name + '.Unknown';
        }

        common.type = 'number';

        let roleUnitInfo = null;
        if (attribute.unit && attribute.unit !== "n%2Fa") {
            common.unit = decodeURIComponent(attribute.unit);
            switch (common.unit) {
                case 'text':
                    common.type = 'string';
                    delete common.unit;
                    break;
                case 'min':
                case 'unixtimestamp':
                    roleUnitInfo = common.unit;
                    delete common.unit;
                    break;
                case 's':
                    common.unit = 'sec';
                    roleUnitInfo = common.unit;
                    break;
            }
        }

        if (attribute.minimum !== null && attribute.minimum !== undefined) {
            common.min = attribute.minimum;
        }
        if (attribute.maximum !== null && attribute.maximum !== undefined) {
            common.max = attribute.maximum;
        }

        if (common.min === 0 && common.max === 1 && attribute.step_value === 1 && attribute.unit === "") {
            common.type = 'boolean';
            delete common.min;
            delete common.max;
        }
        else if (common.min === 0 && common.max === 0) {
            delete common.min;
            delete common.max;
        }

        common.read  = true;
        common.write = !!attribute.editable;

        let roleDetail = null;
        if (attributeTypeMap[attribute.type]) {
            roleDetail = attributeTypeMap[attribute.type].roleDetail;
        }
        // roleUnitInfo min/s/unixtimestamp
        // Try to set roles
        let role = '';
        if (common.type === 'boolean') {
            if (common.read && !common.write) { // Boolean, read-only --> Sensor OR Indicator!
                role = 'sensor';
            }
            else if (common.write && !common.read) { // Boolean, write-only --> Button
                role = 'button';
            }
            else if (common.read && common.write) { // Boolean, read-write --> Switch
                role = 'switch';
            }
        }
        else if (common.type === 'number') {
            if (common.read && !common.write) { // Number, read-only --> Value
                role = 'value';
            }
            else if (common.write && !common.read) { // Boolean, write-only --> ?? Level?
                role = '';
            }
            else if (common.read && common.write) { // Number, read-write --> Level
                role = 'level';
            }
        }
        if (roleDetail && roleDetail !== '' && roleDetail.indexOf('.') === 0 && role !== '') {
            role += roleDetail;
        }
        else if (roleDetail && roleDetail !== '' && roleDetail.indexOf('.') === -1) {
            role = roleDetail;
        }

        if (roleUnitInfo === 'unixtimestamp' && role === 'value') {
            role = 'value.time';
        }
        else if (roleUnitInfo === 'sec' && role === 'value') {
            role = 'value.interval';
        }

        if (role !== '') common.role = role;

        if (!common.role) common.role = 'state';

        return common;
    };


    return module;
};
