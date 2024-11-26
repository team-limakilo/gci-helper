import { redirect } from "@sveltejs/kit";
import { getAvailableCampaigns, getExportData } from "../data/methods";

let campaignDropdown = []

export async function load({ params, url }) {
    
    const activeCampaign = url.searchParams.get('c');
    const availableCampaigns = getAvailableCampaigns()

    if (!campaignDropdown.length) {
        console.log(1)
        const campaignFiles = await Promise.all(availableCampaigns.map(name => {
            return getExportData(name)
        }))

        campaignDropdown = campaignFiles.map(c => {
            return {
                campaignName: c.sortie,
                mapName: c.theater,
                fileName: c.fileName
            }
        })
    }


    campaignDropdown = campaignDropdown.map(c => {
        return {
            ...c,
            active: c.fileName === activeCampaign
        }
    })

    if (!availableCampaigns.includes(activeCampaign)) {
        throw redirect(302, '/status?c=' + availableCampaigns[0])
    }
    
    return {
        campaignDropdown,
        campaign: activeCampaign,
        params
    };
}