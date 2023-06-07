import React from 'react'
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
} from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'

import {
	Company,
	JobAbout,
	JobFooter,
	JobTabs,
	ScreenHeaderBtn,
	Specifics,
} from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'

const tabs = ['About', 'Qualifications', 'Responsibilities', 'Benefits']

const JobDetails = () => {
	const params = useSearchParams()
	const router = useRouter()

	const { data, isLoading, error, refetch } = useFetch(`job-details`, {
		job_id: params.id,
	})

	const [refreshing, setRefreshing] = useState(false)
	const [activeTab, setActiveTab] = useState(tabs[0])

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		refetch()
		setRefreshing(false)
	}, [])

	const displayTabContent = () => {
		switch (activeTab) {
			case 'Qualifications':
				return (
					<Specifics
						title='Qualifications'
						points={data[0].job_highlights?.qualifications ?? ['N/A']}
					/>
				)
			case 'About':
				break
			case 'Responsibilities':
				break
			case 'Benefits':
				break
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerBackVisible: false,
					headerTitle: '',
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={icons.left}
							dimension={'60%'}
							handlePress={() => router.back()}
						/>
					),
					headerRight: () => (
						<ScreenHeaderBtn iconUrl={icons.share} dimension={'60%'} />
					),
				}}
			/>

			<>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={isLoading} onRefresh={refetch} />
					}
				>
					{isLoading ? (
						<ActivityIndicator size='large' color={COLORS.primary} />
					) : error ? (
						<Text>Something went wrong</Text>
					) : data.length === 0 ? (
						<Text>No data found</Text>
					) : (
						<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
							<Company
								companyLogo={data[0].employer_logo}
								jobTitle={data[0].job_title}
								companyName={data[0].employer_name}
								location={data[0].job_country}
							/>
							<JobTabs
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>
							{/* <JobAbout data={data} />
							<Specifics data={data} />
							<JobFooter data={data} /> */}
						</View>
					)}
				</ScrollView>
			</>
		</SafeAreaView>
	)
}

export default JobDetails
