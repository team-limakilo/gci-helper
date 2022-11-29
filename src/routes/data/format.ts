export function prettyAircraftName(aircraft: string) {
    switch (aircraft) {
        case "AJS37": return "AJS-37 Viggen";
        case "AV8BNA": return "AV-8B Harrier II";
        case "MiG-21Bis": return "MiG-21bis";
        case "F-86F": return "F-86F Sabre";
        case "F-14A-135-GR": return "F-14A Tomcat";
        case "F-14B": return "F-14B Tomcat";
        case "FA-18C_hornet": return "F/A-18C Hornet";
        case "F-16C_50": return "F-16C Viper";
        case "a-10a": return "A-10A";
        case "su-25": return "Su-25";
        case "su-25t": return "Su-25T";
        case "su-27": return "Su-27";
        case "su-33": return "Su-33";
        default: return aircraft;
    }
}
