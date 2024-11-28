import { redirect } from "@sveltejs/kit";
import { getAvailableCampaigns, getExportData } from "../data/methods";

let campaignDropdown = []

export async function load({ params, url }) {

    const activeCampaign = params.slug;
    const availableCampaigns = getAvailableCampaigns()


    if (!availableCampaigns.includes(activeCampaign)) {
        throw redirect(302, '/status/' + availableCampaigns[0])
    }
}