import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactCountdownClock from 'react-countdown-clock'
import './index.css'
import {
    Flex, WhiteSpace,Card, NavBar, Icon,List,Pagination, LocaleProvider, DatePicker, WingBlank, InputItem,
    Picker, SearchBar,Accordion,SegmentedControl,Button
  } from 'antd-mobile';

import { observer } from 'mobx-react';
// import { observable,toJS } from 'mobx';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import ruRU from 'antd-mobile/lib/locale-provider/ru_RU';
import { observable } from 'mobx';
const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);
const Item = List.Item;

@observer
class Money extends Component {
    // @observable timescale = 15;
    @observable comments = this.props.location.state.bankIndex == 2?['• Menu Pembayaran','• Pilih Virtual Account','• Input nomor virtual account lalu tekan Benar']:this.props.location.state.bankIndex==1?['•	Silahkan pilih menu Transaksi Lainnya. Setelah itu klik menu Transfer lalu klik menu Rek NSB Lain Permata','•	Masukkan nomor rekening dengan nomor Virtual Account Anda (contoh: 7810202001539202) dan pilih Benar','•	Kemudian masukkan jumlah nominal transaksi sesuai dengan invoice yang ditagihkan pada anda. Setelah itu pilih Benar','•	Lalu pilih rekening anda. Tunggu sebentar hingga muncul konfirmasi pembayaran. Kemudian pilih Y']
    :this.props.location.state.bankIndex == 3?['• Masukkan kartu ATM dan pilih ”Bahasa Indonesia”','• Ketik nomor PIN dan tekan BENAR ','• Pilih menu “BAYAR/BELI”','• Pilih menu “MULTI PAYMENT”','• Ketik kode perusahaan:”89039", tekan"BENAR”','• Masukkan nomor Virtual Account dan tekan “BENAR”','• Isi amount, kemudian tekan"BENAR"','• Muncul konfirmasi data customer. Pilih Nomor 1 sesuai tagihan yang akan dibayar, kemudian tekan "YA“','•	Muncul konfirmasi pembayaran. Tekan "YA" untuk melakukan pembayaran','•	Bukti pembayaran dalam bentuk struk agar disimpan sebagai bukti pembayaran yang sah dari Bank Mandiri','• Transaksi Anda sudah selesai']
    :this.props.location.state.bankIndex == 4?["•	Menu Lainnya", "• Pilih Transfer ", "•	Pilih Rekening Tabungan", "• Pilih Ke Rekening BNI", "•	Input nomor virtual account", "• Input amounttransfer", "•	Konfirmasi pemindahbukuan"]
    :this.props.location.state.bankIndex == 5?["•	Menu Transfer", "•	Pilih Antar Rekening CIMB NIAGA", "• Input amounttransfer", "•	Input nomor virtual account di rekening tujuan ", "• Konfirmasi dan proses pembayaran"]
    :["• Menu Transaksi Lainnya", "•	Pilih Pembayaran", "•	Pilih Lainnya", "•	Pilih BRIVA ", "• Input nomor virtual account ", "•	Input amountyang harus dibayar", "•	Apabila data sudah sesuai lalu tekan YA"]
    @observable selectedSegmentIndex = 0
    @observable selectedSegmentIndex_1 = -1
    @observable Conven_storeComments = this.props.location.state && this.props.location.state.Conven_store?["•	Pilih metode pembayaran Alfamart", "•	Harap catat kode pembayaran", "•	Bayar sekarang ke Alfamart Supermarket", "•	Jika kode pembayaran pada awal 11111, harap info…ada kasir nama bisnis (FLIN) dan kode pembayaran.", "•	Jika kode pembayaran dimulai dengan 02111, harap…a kasir nama dagang (FINPAY) dan kode pembayaran.", "•	Kasir akan mengkonfirmasi nama pedagang, nama pelanggan dan jumlah tagihan", "•	Bayar dengan jumlah tagihan", "•	Kasir akan memberi Anda tiket kecil (tanda terima) dengan meterai dengan meterai dan kasir"]:null
    @observable select_bank = this.props.location.state.bankIndex
    constructor(props) {
        super(props);
        this.state = {
          locale: 'English',
          money:20000,
          timescale: 15
        };
    }

    static contextTypes = {
        router: PropTypes.object
    }

    SegmentedControlChange = e =>{
        const index = e.nativeEvent.selectedSegmentIndex
        this.selectedSegmentIndex = index
        this.selectedSegmentIndex_1 = -1
        console.log(this.select_bank)
        switch (index) {
            case 0:
                if(this.select_bank == 2){
                    this.comments = ['• Menu Pembayaran','• Pilih Virtual Account','• Input nomor virtual account lalu tekan Benar']
                }else if(this.select_bank == 1){
                    this.comments = ['•	Silahkan pilih menu Transaksi Lainnya. Setelah itu klik menu Transfer lalu klik menu Rek NSB Lain Permata','•	Masukkan nomor rekening dengan nomor Virtual Account Anda (contoh: 7810202001539202) dan pilih Benar','•	Kemudian masukkan jumlah nominal transaksi sesuai dengan invoice yang ditagihkan pada anda. Setelah itu pilih Benar','•	Lalu pilih rekening anda. Tunggu sebentar hingga muncul konfirmasi pembayaran. Kemudian pilih Y']
                }else if(this.select_bank == 3){
                    this.comments = ['• Masukkan kartu ATM dan pilih ”Bahasa Indonesia”','• Ketik nomor PIN dan tekan BENAR ','• Pilih menu “BAYAR/BELI”','• Pilih menu “MULTI PAYMENT”','• Ketik kode perusahaan:”89039", tekan"BENAR”','• Masukkan nomor Virtual Account dan tekan “BENAR”','• Isi amount, kemudian tekan"BENAR"','• Muncul konfirmasi data customer. Pilih Nomor 1 sesuai tagihan yang akan dibayar, kemudian tekan "YA“','•	Muncul konfirmasi pembayaran. Tekan "YA" untuk melakukan pembayaran','•	Bukti pembayaran dalam bentuk struk agar disimpan sebagai bukti pembayaran yang sah dari Bank Mandiri','• Transaksi Anda sudah selesai']
                }else if(this.select_bank == 4){
                    this.comments = ["•	Menu Lainnya", "• Pilih Transfer ", "•	Pilih Rekening Tabungan", "• Pilih Ke Rekening BNI", "•	Input nomor virtual account", "• Input amounttransfer", "•	Konfirmasi pemindahbukuan"]
                }else if(this.select_bank == 5){
                    this.comments = ["•	Menu Transfer", "•	Pilih Antar Rekening CIMB NIAGA", "• Input amounttransfer", "•	Input nomor virtual account di rekening tujuan ", "• Konfirmasi dan proses pembayaran"]
                }else if(this.select_bank == 6){
                    this.comments = ["• Menu Transaksi Lainnya", "•	Pilih Pembayaran", "•	Pilih Lainnya", "•	Pilih BRIVA ", "• Input nomor virtual account ", "•	Input amountyang harus dibayar", "•	Apabila data sudah sesuai lalu tekan YA"]
                }
                break;
            case 1:
                if(this.select_bank == 2){
                    this.comments = ['•	Send SMS to 69811 with the format TRANSFER <fund source account number>             <Input virtual account number> <amountto be paid>']
                }else if(this.select_bank == 1){
                    this.comments = ['•	Silahkan login mobile banking yang dimiliki Permata Bank','• Lalu klik Menu Pembayaran Tagihan dan pilih Menu Virtual Account','• Kemudian pilih Tagihan Anda dan pilih Daftar Tagihan Baru','•	Masukkan nomor rekening dengan nomor Virtual Account Anda (contoh: 7810202001539202) sebagai Nomor Tagihan. Apabila selesai silahkan klik Konfirmasi','• Masukkan Nama Pengingat setelah itu klik Lanjut. Apabila selesai silahkan klik Konfirmasi','• Masukkan jumlah nominal tagihan sesuai dengan invoice. Apabila selesai silahkan klik Konfirmasi','• Masukkan Response Code dan klik Konfirmasi apabila telah selesai Proses transfer telah selesai']
                }else if(this.select_bank == 3){
                    this.comments =['•	Log in Mobile Banking Mandiri Online','• Klik “Bayar” lalu pilih “Multi Payment”','• Pilih Penyedia Jasa “89039”','• Masukkan no virtual account dengan kode perusahaan “89039” lalu pilih “Tambah Sebagai Nomor Baru”','•	Masukkan “amount” lalu pilih “Konfirmasi”','• Pilih “Lanjut”','• Muncul tampilan konfirmasi pembayaran','• Scroll ke bawah di tampilan konfirmasi pembayaran lalu pilih “Konfirmasi”','• Masukkan “PIN” dan transaksi telah selesai']
                }else if(this.select_bank == 4){
                    this.comments = ["•	Menu Transfer", "• Pilih Antar Rekening BNI dan Input Rekening Baru", "• Input rekening debet,nomor virtual account di rekening tujuan, dan amounttransfer", "•	Input password dan konfirmasi transaksi"]
                }else if(this.select_bank == 5){
                    this.comments = ["•	Menu Transfer", "•	Pilih Transfer to Other CIMB Niaga Account", "•	Input nomor virtual account dan amountpembayaran", "• Input PIN", "• Konfirmasi dan proses pembayaran"]
                }else if(this.select_bank == 6){
                    this.comments = ["•	Pilih Mobile Banking BRI", "•	Pilih menu Pembayaran", "•	Pilih submenu BRIVA", "•	Input nomor virtual account", "•	Input amountyang harus dibayar", "•	Input PIN"]
                }
                break;
            case 2:
                if(this.select_bank == 2){
                    this.comments = ['• Pilih menu fund transfer','• Pilih Virtual Account','• Pilih sumber rekening','• Input nomor virtual account','• Input amounttransfer','• Input nomor Token (TAC)']
                }else if(this.select_bank == 1){
                    this.comments = ['• Silahkan login internet banking kemudian pilih Menu Pembayaran','• Lalu pilih sub menu Pembayaran Tagihan dan klik Virtual Account','• Silahkan pilih rekening anda lalu masukkan nomor rekening dengan nomor Virtual Account (contoh: 7810202001539202) lalu klik Lanjut','• Masukkan jumlah nominal tagihan pada bagian Total Pembayaran sesuai dengan invoice yang dikirimkan. Kemudian klik Submit','• Tunggu sebentar hingga anda memperoleh SMS notifikasi yang berisi sebuah KODE. Nah, setelah itu masukkan KODE tersebut','• Proses transfer internet banking telah selesai']
                }else if(this.select_bank == 3){
                    this.comments = ['•	Kunjungi website Mandiri Internet Banking','• Login denganmemasukkan USER ID dan PIN','• Pilih "Pembayaran“','•	Pilih "Multi Payment“','• Pilih "No Rekening Anda“','•	Pilih Penyedia Jasa “89039”','•	Pilih "No Virtual Account“','• Masukkan nomor Virtual Account anda','•	Masuk ke halaman konfirmasi 1','• Apabila benar/sesuai, klik tombol tagihan TOTAL, kemudian klik "LANJUTKAN“','• Masuk ke halaman konfirmasi 2','•	Masukkan Challenge Code yang dikirimkan ke Token Internet Banking Anda, kemudian klik "Kirim“','• Anda akan masuk ke halaman konfirmasi jika pembayaran telah selesa']
                }else if(this.select_bank == 4){
                    this.comments = ["•	Menu Transfer", "•	Pilih Tambah Rekening Favorit ", "•	Pilih Antar Rekening BNI ", "•	Bila menggunakan desktop untuk menambah rekening…lalu Atur Rekening Tujuan, Tambah Rekening Tujuan", "•	Masukkan nama dan nomor virtual account", "•	Input kode otentikasi token ", "•	Rekening tujuan berhasil ditambahkan", "•	Kembali ke menu Transfer", "•	Pilih Transfer Antar Rekening BNI", "•	Pilih Rekening Tujuan", "•	Pilih rekening debet dan input amounttransfer", "•	Input kode otentikasi token"]
                }else if(this.select_bank == 5){
                    this.comments = ["•	Menu Transfer", "•	Pilih Rekening Bank Lain", "•	Input nomor virtual account pada rekening tujuan", "•	Input amountpembayaran", "•	Input bank penerima dengan CIMB Niaga ", "•	Jenis transfer yang digunakan adalah online/realtime", "•	Konfirmasi dan proses pembayaran"]
                }else if(this.select_bank == 6){
                    this.comments = ["•	Pilih menu Pembayaran Tagihan", "•	Pilih submenu Pembayaran", "• Pilih BRIVA", "•	Input nomor virtual account pada kolom kode bayar lalu kirim", "•	Input amountyang pembayaran pada kolom Jumlah (untuk open payment) lalu klik kirim", "•	Apabila data sudah sesuai masukkan Password dan mToken lalu kirim"]
                }
                break;
            default:
                break;
        }

    }

    SegmentedControlChange_1 = e=>{
        const index = e.nativeEvent.selectedSegmentIndex
        this.selectedSegmentIndex = -1
        this.selectedSegmentIndex_1 = index
        if(this.select_bank == 2){
            this.comments = ['• Menu Transfer Antar Bank','• Pilih kode Maybank 016+input nomor virtual account','• Input amounttransfer','• Apabila data sudah sesuai tekan Ya']
        }else if(this.select_bank == 1){
            this.comments = ['• Masukkan kata sandi','• Pilih "Transfer", jika Anda menggunakan bank lain, pilih "Transaksi Lainnya" - "Transfer"','• Pilih "Transfer ke bank lain"','• Masukkan nomor bank "013" dan masukkan 16 digit','• Masukkan jumlah total (jumlah total harus sama, tidak kurang, tidak lebih) .Jika transaksi tidak sama, transaksi gagal.','• Kemudian tekan untuk konfirmasi']
        }else if(this.select_bank == 3){
            this.comments = ['•	1. Pilih Menu lain','• 2. Pilih Transfer','• 3. Pilih dari rekening tabungan','• 4. Pilih ke rek. Bank lain','•	5. Masukkan kode bank dilanjutkan dengan nomor Virtual Account anda (Mandiri 008+nomor virtual account)','•	6. Input Nominal yang ditagihkan sebagai Nominal Transfer','• 7. Selesai, transaksi berhasil']
        }else if(this.select_bank == 4){
            this.comments = ["•	Menu Transfer", "•	Pilih Rekening Bank Lain", "• Input kode bank 009", "•	Input nomor virtual account pada rekening tujuan", "• Input amountpembayaran", "• Konfirmasi dan proses pembayaran"]
        }else if(this.select_bank == 5){
            this.comments = ["•	Menu Transfer", "•	Pilih Rekening Bank Lain", "•	Input kode bank 022", "•	Input nomor virtual account pada rekening tujuan", "•	Input amountpembayaran", "•	Konfirmasi dan proses pembayaran"]
        }else if(this.select_bank == 6){
            this.comments =["•	Pilih Transaksi Lainnya", "• Pilih Transfer", "• Pilih ke Rek Bank Lain", "• Masukkan kode Bank 002 ", "• Input amountpembayaran", "• Input nomor virtual account ", "•	Pilih sumber rekening pembayaran ", "•	Apabila data sudah sesuai lalu tekan Benar"]
        }
    }

    onChange = (value) => {
    this.setState({
        locale: value[0],
    });
    }
    render(){
        const { locale,money } = this.state;
        const languages = [
            {
                value: '中国',
                label: '中国',
                language: undefined,
            },
            {
                value: 'English',
                label: 'English',
                language: enUS,
            },
            {
                value: 'Русский',
            label: 'Русский',
            language: ruRU,
        },
        ];
        const currentLocale = languages.find(item => item.value === locale).language;
        return(
            <div className='money'>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {this.context.router.push({ pathname: '/pay',state: { bankIndex:this.select_bank}})} }
                leftContent={"Pay Money"}
                ></NavBar>
                <WingBlank>
                    <LocaleProvider locale={currentLocale}>
                        <div>
                            {/* <Pagination total={5} current={1} /> */}
                            {/* <SearchBar placeholder="Search" showCancelButton /> */}
                            {/* <InputItem type="money" placeholder="money input" /> */}
                            <WhiteSpace size="sm" />
                            <div className="clock">
                                <div style={{display:'flex',alignItems: 'center',fontSize:18,color:'#fdfdfd'}}>
                                {/* <svg t="1592650668754" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1215" width="32" height="32"><path d="M512 64.383234C264.7878 64.383234 64.383234 264.7878 64.383234 512s200.404567 447.616766 447.616766 447.616766 447.616766-200.404567 447.616766-447.616766S759.2122 64.383234 512 64.383234zM691.046707 601.523353 512 601.523353c-24.721118 0-44.761677-20.040559-44.761677-44.761677 0 0 0 0 0-0.001022s0 0 0-0.001022L467.238323 288.191617c0-24.721118 20.040559-44.761677 44.761677-44.761677 24.721118 0 44.761677 20.040559 44.761677 44.761677l0 223.808383 134.28503 0c24.721118 0 44.761677 20.040559 44.761677 44.761677S715.767824 601.523353 691.046707 601.523353z" p-id="1216" fill="#13227a"></path></svg> */}
                                <ReactCountdownClock seconds={900}
                                color="#132379"
                                alpha={0.9}
                                weight={2}
                                fontSize={18}
                                size={40}
                                onComplete={()=>{}} />
                                &nbsp;&nbsp;Menunggu pembayaran&nbsp;!</div>
                            </div>
                            <WhiteSpace size="sm" />
                            <Card>
                                <Card.Header
                                    title="Informasi Pembayaran"
                                    extra={<span></span>}
                                />
                                <Card.Footer content="Bank" extra={
                                        <div>BBC</div>
                                    } />
                                <Card.Footer content="Virtual account" extra={
                                        <div>account number</div>
                                    } />
                                <Card.Footer content="Nomor pesanan" extra={
                                        <div>C7008080223121366</div>
                                    } />
                                <Card.Body>
                                    <div style={{display:'inline'}}>Nilai Transfer</div>
                                    <div style={{display:'inline',position: 'absolute',right:10}}>{money.toLocaleString()}</div>
                                </Card.Body>
                            </Card>
                            <WhiteSpace size="lg" />
                            <Card>
                                <Card.Header
                                    title="Perhatian"
                                    extra={<span></span>}
                                />
                                <Card.Body>
                                    <div style={{display:'inline',color:'#bbb'}}>
                                    {this.Conven_storeComments?this.Conven_storeComments.map(v=>{
                                        return <div>{v}<br /></div>
                                    }):this.comments.map(v=>{
                                        return <div>{v}<br /></div>
                                    })}
                                    </div>
                                </Card.Body>
                            </Card>
                            {
                                !(this.props.location.state && this.props.location.state.Conven_store)?
                                <div>
                                    <p className="" style={{color:'#fdfdfd'}}><div className="box"></div>Panduann PemBayaran</p>
                                    <SegmentedControl
                                    values={['ATM', 'Mobile Banking', 'Internet Banking']}
                                    tintColor={'#132379'}
                                    selectedIndex={this.selectedSegmentIndex}
                                    style={{ height: '20px' }}
                                    onChange={this.SegmentedControlChange}
                                    />
                                    <WhiteSpace size="sm" />
                                    <p className="" style={{color:'#fdfdfd'}}><div className="box"></div>Panduann Lainnya</p>
                                    <SegmentedControl
                                    values={['ATM Lainnya']}
                                    tintColor={'#132379'}
                                    selectedIndex={this.selectedSegmentIndex_1}
                                    style={{ height: '20px',width:'116px' }}
                                    onChange={this.SegmentedControlChange_1}
                                    />
                                </div>
                                :null
                            }
                            <WhiteSpace size="lg" />
                            <Button type="primary" size="small" onClick={()=>{
                                this.context.router.push({ pathname: '/pay',state: { bankIndex:this.select_bank}})
                                //this.context.router.push({ pathname: '/result',state: { bankIndex:this.select_bank}})
                            }}>Kembali ke akun</Button>
                        </div>
                    </LocaleProvider>
                </WingBlank>
            </div>
        )
    }
};

export default Money