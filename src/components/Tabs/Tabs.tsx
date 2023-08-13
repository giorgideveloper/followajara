'use client'
import { Tab, TabList, TabPanel, Tabs as Tb } from 'react-tabs';
import UpsertProfileForm from "../Auth/UpsertProfileForm";
import TourPackage from '../TourPackage';
import SocialScreens from '../SocialScreens';
import UpdatePasswordForm from '../Auth/UpdatePasswordForm';

const Tabs = ({ data, userId, userEmail }: any) => {

    return (
        <Tb
            className=""

            selectedTabClassName='tab-active'>
            <TabList>
                <Tab className="tab tab-lg tab-lifted font-fira-go">პაკეტი</Tab>
                <Tab className="tab tab-lg tab-lifted font-fira-go">სქრინები</Tab>
                <Tab className="tab tab-lg tab-lifted font-fira-go">პროფილის რედაქტირება</Tab>
                <Tab className="tab tab-lg tab-lifted font-fira-go">პაროლის შეცვლა</Tab>
            </TabList>
            <TabPanel>
                <TourPackage id={data.tour} />
            </TabPanel>
            <TabPanel>
                <SocialScreens userId={userId} />
            </TabPanel>
            <TabPanel>
                <UpsertProfileForm defaults={{ ...data }} />
            </TabPanel>
            <TabPanel>
                <UpdatePasswordForm userEmail={userEmail} />
            </TabPanel>
        </Tb>
    )
}

export default Tabs