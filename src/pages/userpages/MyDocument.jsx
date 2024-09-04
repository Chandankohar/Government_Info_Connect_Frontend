import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Nepalilogo from '../../assets/Nepalilogo.png'
import GovInfologo from '../../assets/GovInfoConnect_Logo.png'
const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: 'white' ,padding:'20'},
    box:{ border:2,borderColor:'black' ,padding:'20',height:'100%'},
    section: {flexDirection: 'row', margin: 10, padding: 10, justifyContent: 'center'},
    
    title: { fontSize: 24, textAlign: 'center', marginBottom: 2 },
    subtitle: { fontSize: 16, textAlign:'right', marginBottom: 2 ,marginLeft:'20%'},
    product: { marginLeft:'40',marginRight:'40',display:'flex',flexDirection:'row' },
    productDetail: { fontSize: 14 ,marginBottom: 2,width:'50%'},
    footerDetail: { fontSize: 14 ,marginBottom: 2,borderTop:1},
    footerscheme:{marginBottom: '10',display:'flex',flexDirection:'row',justifyContent:'space-between',marginLeft:'40',marginRight:'40',},
    documentimg:{marginLeft:'40',marginRight:'40',fontSize:14,height:'55%',display:'flex',flexDirection:'row'},
    logoimage: {

        width: 60,
        height: 60,
      },
      image: {
        marginLeft:'5',
        width: 200,
        height: 200
      }
  });
  const MyDocument = ({applyscheme}) => (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.box} >
      <View style={styles.section}>
       
      <Image style={styles.logoimage} src={Nepalilogo} />
      <View >
      <Text style={styles.title}> GOVERNMENT INFO CONNECT </Text>
      <Text style={styles.subtitle}> {applyscheme.scheme.municipality.toUpperCase()} MUNICIPALITY </Text>
        <Text style={styles.subtitle}> {applyscheme.schemename} </Text>
        </View>
        <Image style={styles.logoimage} src={GovInfologo} />
        </View>
        <Text style={{fontSize:'10',marginLeft:'40'}}>Reg.ID: {applyscheme._id.slice(applyscheme._id.length-5,applyscheme._id.length)}</Text>
        <View style={{color:'black',marginTop:'20',marginBottom:'20',textAlign:'center'}}>
        <Text  >Detail</Text>
        </View>
        <View style={styles.product}>
          <Text style={styles.productDetail}>Username:</Text>
          <Text style={styles.productDetail}>{applyscheme.username.toUpperCase()}</Text>
          </View>
          <View style={styles.product}>
          <Text style={styles.productDetail}>Citizenship Id:</Text>
          <Text style={styles.productDetail}>{applyscheme.usercitizenid}</Text>
          </View>
          <View style={styles.product}>
          <Text style={styles.productDetail}>Address:</Text>
          <Text style={styles.productDetail}>{applyscheme.address}</Text>
          </View>
          <View style={styles.product}>
          <Text style={styles.productDetail}>Scheme Type:</Text>
          <Text style={styles.productDetail}>{applyscheme.schemetype.toUpperCase()}</Text>
          </View>
          <View style={styles.product}>
          <Text style={styles.productDetail}>Applied Date:</Text>
          <Text style={styles.productDetail}>{applyscheme.date.slice(0,10)}</Text>
          </View>
          <View style={styles.product}>
          <Text style={styles.productDetail}>Phone No.:</Text>
          <Text style={styles.productDetail}>{applyscheme.phone}</Text>
        </View>
        <Text style={{marginBottom:'20',marginLeft:'40',marginRight:'40',marginTop:'20',}}>Applied Document:</Text>
        <View style={styles.documentimg}>
        {applyscheme.document.map((doc,index)=>{return(<Image style={styles.image} src={doc} key={index} />)})}
        </View>
        
        <View style={styles.footerscheme}>
          
          <Text style={styles.footerDetail}>Status: {applyscheme.status.toUpperCase()}</Text>
          
          <Text style={styles.footerDetail}>Sign</Text>
          
          <Text style={styles.footerDetail}>Stamp</Text>
        </View>
        <Text style={{fontSize:'10'}}>Note: Please take printout of all the document you applied</Text>
        </View> 
    </Page>
    </Document>
  );

  export default MyDocument