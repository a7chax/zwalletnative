import React,{useState, Fragment,useEffect} from 'react'
import {
	View,
	ScrollView,
	Image,
	Touchable,
	TextInput,
	TouchableNativeFeedback
} from 'react-native'

import styles from './topup.style.js'
import {Button, Text} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import {MobileNav} from '../../../components'
import {TopupIcons} from '../../../assets/resources'
import axios from 'axios';


const Topup = (props) => {
	const [profileData, setProfileData] = useState([])
	const [topup, setTopup] = useState([])
	const [pincode, setPincode] = useState('')


	const toDashboard = () => {
		props.navigation.navigate('UserDashboard')
	}


    useEffect(() => {           
	        axios.get('http://192.168.1.10:7000/zwallet/api/v1/topup/all')
	        .then(res =>{
	        
	        	setTopup(res.data.data)

	        
	          console.log('ini data topup: ', topup)
	        }).catch(err => {
	          console.log('data transfer axios error: ', err.message)
	        });       


	        }, [])



	return(
		<Fragment>
			<ScrollView style={styles.bodyBackground}>				
				<MobileNav thisnavigate={() => toDashboard()} pageTitle='Top Up'/>				
				<View style={styles.container}>

						<View style={styles.dashboardPanelist}>
							<View style={styles.spaceBetween}>
								<View style={styles.profileStatus}>
									<TouchableNativeFeedback>
										<TopupIcons/>
									</TouchableNativeFeedback>

			 						<View style={styles.profileNameNavbarSection}>
										<Text style={styles.vcAccount}>Virtual Account Number</Text>
										<Text style={styles.vcNumber}>2389 081393877946</Text>
									</View>			
								</View>							
							</View>							
						</View>		

					<View>
						<Text style={styles.formDesc}>We provide you virtual account number for top up via nearest ATM.</Text>
					</View>
										
					<View style={styles.likeRowTwo}>						
							<Text style={styles.contact}>How to Top-Up</Text> 							
					</View>

					{ topup.map( topup => {
						return(
							<View style={styles.dashboardPanelist}>
								<View style={styles.spaceBetween}>
									<View style={styles.topupStat}>
											<Text style={styles.topupNumber}>{topup.stepNumber}</Text>
				 						<View style={styles.profileNameNavbarSection}>
											<Text style={styles.topupText}>{topup.instruction}</Text>
										</View>			
									</View>							
								</View>							
							</View>		
						)
					})

					}
												

					



					

				</View>			
			</ScrollView>
		</Fragment>
	)
}

export default Topup