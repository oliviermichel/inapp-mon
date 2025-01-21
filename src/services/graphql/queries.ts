export const GetItemFromId = `
fragment itemDataSimple on Message {
    campaignName { value }
    header { value }
    startDate { formattedDateValue }
    endDate { formattedDateValue }
    marketCodes { targetItems { field(name: "Market Code") { value } } }
    models { targetItems { field(name:"Id") { value } } }
    image1 { value }
    message {value}
}

query SearchItem($id: String!, $language: String!) { 
    search(
        fieldsEqual: [
            {
                name: "_group", 
                value: $id
            }
        ], 
        language: $language,
        rootItem: "/sitecore/content/Husqvarna/InAppMessage/AMC"
    ) {
        results {
            items {
                item {
                    id
                    versions(allLanguages: true) {
                        language { name }
                        ...itemDataSimple
                    }
                }
                name
                id
                path
            }
        }
    }
}
`;

export const GetItemsUnderExplorerRoot = `
{
item(path: "/sitecore/content/Husqvarna/InAppMessage/AMC/ExplorerRoot") {
  id
  name
  children {
    id
    name
    MessageHeader: field(name:"MessageHeader"){name value}
    TeaserHeader: field(name:"TeaserHeader"){name value}
    TeaserDescription: field(name:"TeaserDescription"){name value}
    Image: field(name: "Image"){name value}
    path
    template{name}
    ... on InAppExplorerHeroCard {messages {value}}
    ... on InAppExplorerListCard {messages {value}}
    ... on InAppExplorerLargeCard {messages {value}}
    ... on InAppExplorerNoClickCard {messages {value}}
    ... on InAppExplorerVerticalList {messages {value}}
    ... on InAppExplorerCollectionCard {messages {value}}
    }
  }
}
`;

export const GetFieldsFromItem = `
fragment itemData on Message {
                            campaignName {value}
                            notificationImageId {value}
                            notificationMessage {value}
                            teaserDescription {value}
                            notificationButtonYesText {value}
                            image1 {value}
                            image1Text {value}
                            image2 {value}
                            image2Text {value}
                            image3 {value}
                            image3Text {value}
                            image4 {value}
                            image4Text {value}
                            image5 {value}
                            image5Text {value}
                            header {value}
                            message {value}
                            buttonText {value}
                            campaignActionLinkInternal {rendered}
                            campaignActionLink {rendered}
                            messageType {rendered}
                            models { targetItems {Id}}
                            startDate { formattedDateValue}
                            endDate { formattedDateValue}
                            messageCategory {value}
                            consents {rendered}
                            marketCodes { targetItems {name}}
                            cDPSegments {value}
                            oS {value}
                            recipients {targetItems {name}}
	                    }

                    query SearchItem($campaignName : String!){ 
                      search(
                        fieldsEqual: [
                          {
                            name: "campaign_name", 
                            value: $campaignName
                          }
                        ], 
                        rootItem: "/sitecore/content/Husqvarna/InAppMessage/AMC") {
                        results {
                          items {
				                    item {
                              versions(allLanguages:true) {
                                language{name}
                                ...itemData
                              }
                            }
                            name
                            id
                            path
                          }
                        }
                      }
  
                    }
`;