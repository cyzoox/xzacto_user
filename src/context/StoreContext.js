import { Item } from 'native-base';
import React, { useContext, useRef, useState, useEffect  } from 'react';
import { Categories, Customers, Expenses, Product, Staffs, Stores, List, Transactions, TR_Details, Archive, ArchiveInfo, AttendanceLogs, Credit_Logs, Credit_List, BO, Returned, Discount } from '../../schemas';
import { useAuth } from './AuthContext';
import uuid from 'react-native-uuid';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useCallback } from 'react';
const StoreContext = React.createContext(null);

const StoreProvider = ({ children, projectPartition, store_info, currency }) => {
    const [stores, setStores] = useState([]);
    const [list, setList] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [trdetails, setTrDetails] = useState([]);
    const [custom_trdetails, setCustomTrDetails] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [archive, setArchive] = useState([]);
    const [archiveInfo, setArchiveInfo] = useState([]);
    const [settings, setSettings] = useState([]);
    const [attendance_logs, setAttendanceLogs] = useState([]);
    const [bos, setBO] = useState([]);
    const [returns, setReturns] = useState([]);
    const realmRef = useRef(null);
    const today = moment().unix();
    const [products_list, setProductss] = useState([]);
    const [cart, setLists] = useState([])
  useEffect(() => {

    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };
    const config = {
      sync: {
        user: user,
        partitionValue: projectPartition,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    // TODO: Open the project realm with the given configuration and store
    // it in the realmRef. Once opened, fetch the Task objects in the realm,
    // sorted by name, and attach a listener to the Task collection. When the
    // listener fires, use the setTasks() function to apply the updated Tasks
    // list to the state.

    setLoading(true)

    Realm.open(config).then((projectPOS) => {

     
      const date = moment().unix();
      realmRef.current = projectPOS;
      const syncStore = projectPOS.objects("Stores");
      const filteredStore = syncStore.filtered("_id == $0", store_info._id);
      setStores([...filteredStore]);
      filteredStore.addListener(() => {
        setStores([...filteredStore]);
      
      });

      const syncProducts = projectPOS.objects("Products");
      const filteredProducts = syncProducts.filtered("store_id == $0", store_info._id);
      let sortedProducts = filteredProducts.sorted("name");
      setProducts([...sortedProducts]);
      sortedProducts.addListener(() => {
        setProducts([...sortedProducts]);
     
      });

      const getCategory = projectPOS.objects("Categories");
      const filteredCategory = getCategory.filtered("store_id == $0", store_info._id);
      let sortedCategory = filteredCategory.sorted("name");
      setCategory([...sortedCategory]);
      sortedCategory.addListener(() => {
        setCategory([...sortedCategory]);
     
      });

      const syncExpenses = projectPOS.objects("Expenses");
      const filteredExpenses = syncExpenses.filtered("store_id == $0", store_info._id);
      const filteredExpenses2 = filteredExpenses.filtered("date == $0", moment.unix(date).format('MMMM DD, YYYY'));
      let sortedExpenses = filteredExpenses2.sorted("description");
      setExpenses([...sortedExpenses]);
      sortedExpenses.addListener(() => {
        setExpenses([...sortedExpenses]);
 
      });

      const syncList = projectPOS.objects("List");
      const filteredList = syncList.filtered("store_id == $0", store_info._id);
      let sortedList = filteredList.sorted("name");
      setList([...sortedList]);
      sortedList.addListener(() => {
        setList([...sortedList]);
   
      });

      const syncCustomers = projectPOS.objects("Customers");
      const filteredCustomer = syncCustomers.filtered("store_id == $0", store_info._id);
      let sortedCustomers = filteredCustomer.sorted("name");
      setCustomers([...sortedCustomers]);
      sortedCustomers.addListener(() => {
        setCustomers([...sortedCustomers]);

      });

      const syncStaffs = projectPOS.objects("Staffs");
      const filteredStaff = syncStaffs.filtered("store_id == $0", store_info._id);
      let sortedStaffs = filteredStaff.sorted("name");
      setStaffs([...sortedStaffs]);
      sortedStaffs.addListener(() => {
        setStaffs([...sortedStaffs]);
 
      })

  

      const syncArchive = projectPOS.objects("Archive");
      const filteredArchive = syncArchive.filtered("store_id == $0", store_info._id);
      let sortedArchive = filteredArchive.sorted("timeStamp");
      setArchive([...sortedArchive]);
      sortedArchive.addListener(() => {
        setArchive([...sortedArchive]);
   
      });

      const syncTR_Details= projectPOS.objects("TR_Details");
      const filteredTR_Details = syncTR_Details.filtered("store_id == $0", store_info._id);
      const filteredTodaysTR_Details = filteredTR_Details.filtered("date == $0", moment.unix(today).format('MMMM DD, YYYY'));
      let sortedTR_Details = filteredTodaysTR_Details.sorted("timeStamp");
      setCustomTrDetails([...sortedTR_Details]);
      sortedTR_Details.addListener(() => {
        setCustomTrDetails([...sortedTR_Details]);
   
      });

      const syncArchiveInfo = projectPOS.objects("ArchiveInfo");
      const filteredArchiveInfo = syncArchiveInfo.filtered("store_id == $0", store_info._id);
      let sortedArchiveInfo = filteredArchiveInfo.sorted("timeStamp");
      setArchiveInfo([...sortedArchiveInfo]);
      sortedArchiveInfo.addListener(() => {
        setArchiveInfo([...sortedArchiveInfo]);

      });

      const syncSettings = projectPOS.objects("Settings");
      setSettings([...syncSettings]);
      syncSettings.addListener(() => {
        setSettings([...syncSettings]);

      });

     
   

    {
      /*   
         const syncAttendanceLogs = projectPOS.objects("AttendanceLogs");
      const filteredAttendanceLogs = syncAttendanceLogs.filtered("store_id == $0", store_info._id);
      const filteredAttendanceDate = filteredAttendanceLogs.filtered("date == $0", moment.unix(date).format('MMMM DD, YYYY'));
      let sortedAttendanceLogs = filteredAttendanceDate.sorted("timeStamp");
      setAttendanceLogs([...sortedAttendanceLogs]);
      sortedAttendanceLogs.addListener(() => {
        setAttendanceLogs([...sortedAttendanceLogs]);
    
      });

      const syncBO = projectPOS.objects("BO");
      const filteredBO = syncBO.filtered("store_id == $0", store_info._id);
      const filteredBODate = filteredBO.filtered("date == $0", moment.unix(date).format('MMMM DD, YYYY'));
      let sortedBO = filteredBODate.sorted("timeStamp");
      setBO([...sortedBO]);
      sortedBO.addListener(() => {
        setBO([...sortedBO]);
    
      });

      const syncReturns = projectPOS.objects("Returned");
      const filteredReturns= syncReturns.filtered("store_id == $0", store_info._id);
      const filteredReturnsDate = filteredReturns.filtered("date == $0", moment.unix(date).format('MMMM DD, YYYY'));
      let sortedReturns= filteredReturnsDate.sorted("timeStamp");
      setReturns([...sortedReturns]);
      sortedReturns.addListener(() => {
        setReturns([...sortedReturns]);
        
      });*/
    } 

      setLoading(false)
    });
   


    return () => {
      // cleanup function
      const projectPOS = realmRef.current;
      if (projectPOS) {
        projectPOS.close();
        realmRef.current = null;
        setStores([]);
     
        setLoading(false)
      }
    };
  
  }, [user]);

 const getTRDetails = (tr_id) => {
 
  const projectPOS = realmRef.current;
  const syncTrDetails = projectPOS.objects("TR_Details");
  const filteredTRDetails = syncTrDetails.filtered("tr_id == $0", tr_id);
  let sortedTrDetails = filteredTRDetails.sorted("name");
  setTrDetails([...sortedTrDetails]);
 }
  
  const createStore = (newStore, branch ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Store",
        new Store({
          name: newStore,
          branch: branch,
          owner: `${user.id}`,
          partition: `project=${user.id}`,
        })
      );
    });
  };
  
  const createExpenses = ( expenses ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Expenses",
        new Expenses(expenses)
      );
    });
  };

  const createDiscount = ( discount ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Discount",
        new Discount(discount)
      );
    });
  };

  const createAttendanceLog = ( log ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "AttendanceLogs",
        new AttendanceLogs(log)
      );
    });
  };

  const createArchive = ( archive, list ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "ArchiveInfo",
        new ArchiveInfo(archive)
      );
    });
    createArchiveList(list, archive.id)
  };


  const createArchiveList = ( list, ids ) => {
    const projectPOS = realmRef.current;
    
    // Create a new task in the same partition -- that is, in the same project.
      list.forEach(item => {
        let lists = {
          name : item.name,
          partition: item._partition,
          brand: item.brand,
          oprice: item.oprice,
          sprice:item.sprice,
          unit: item.unit,
          category: item.category,
          store_id: item.store_id,
          store: item.store,
          quantity: item.quantity,
          id: item._id,
          timeStamp: item.timeStamp,
          archive_id: ids
        }
        projectPOS.write(() => {
          projectPOS.create(
            "Archive",
            new Archive(lists)
          );
         
        });
      }); 
    
      ondeleteList();
  };

  const createCustomer = ( customer ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Customers",
        new Customers(customer)
      );
    });
  };

  const createProducts = ( product ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Products",
        new Product(product)
      );
    });
  };

  const createBO = ( product ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "BO",
        new BO(product)
      );
    });
  };

  const createReturn = ( product ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Returned",
        new Returned(product)
      );
    });
  };

  const createList = ( list, item ) => {
    const projectPOS = realmRef.current;
    if(item.stock === 0){
      return;
    }
    projectPOS.write(() => {
      const products = projectPOS.objects("List");
      const filteredProducts = products.filtered("_id == $0", list.id);

      if(filteredProducts.length === 0){
        item.stock -= list.quantity;
        projectPOS.create(
          "List",
          new List(list),
          "modified"
        );
      }else{
        item.stock -= list.quantity;
        filteredProducts[0].quantity += list.quantity;
      }
     
    });
  };

  const createCreditLogs = ( lists, credit_logs ) => {
    const projectPOS = realmRef.current;
    
    projectPOS.write(() => {
      projectPOS.create(
        "Credit_Logs",
        new Credit_Logs(credit_logs)
      );

      const logs = projectPOS.objects("Customers");
      const filteredLogs = logs.filtered("_id == $0", credit_logs.customer_id);
      filteredLogs[0].credit_balance += credit_logs.total;
    });
    createCreditList(lists, credit_logs.id)
  };

  const createCreditList = ( lists,crid ) => {
    const projectPOS = realmRef.current;
    
    lists.forEach(item => {
      let list = {
        name : item.name,
        partition: item._partition,
        brand: item.brand,
        oprice: item.oprice,
        sprice:item.sprice,
        unit: item.unit,
        category: item.category,
        store_id: item.store_id,
        store: item.store,
        quantity: item.quantity,
        cr_id: crid,
        id: uuid.v4()

      }
      projectPOS.write(() => {
        projectPOS.create(
          "Credit_List",
          new Credit_List(list)
        );
       
      });
    }); 
  };


  const createTransaction = ( lists, transaction ) => {
    const projectPOS = realmRef.current;
    
    projectPOS.write(() => {
      projectPOS.create(
        "Transactions",
        new Transactions(transaction)
      );
    
    });
    saveList(lists, transaction.id, transaction.attendant_id,transaction.attendant_name)
  };

  const reListArchive = ( lists ) => {
    const projectPOS = realmRef.current;
    
    lists?.forEach(item => {
    
      let list = {
        name : item.name,
        partition: item._partition,
        brand: item.brand,
        oprice: item.oprice,
        sprice:item.sprice,
        unit: item.unit,
        category: item.category,
        store_id: item.store_id,
        store: item.store,
        quantity: item.quantity,
        id: item._id,
        timeStamp: item.timeStamp

      }
      projectPOS.write(() => {
        projectPOS.create(
          "List",
          new List(list)
        );
       
      });
    }); 

    ondeleteArchive();
  };

  const saveList = ( lists,trid, name, id ) => {
    const projectPOS = realmRef.current;
    const date = moment().unix()
    lists.forEach(item => {
      let list = {
        name : item.name,
        partition: item._partition,
        brand: item.brand,
        oprice: item.oprice,
        sprice:item.sprice,
        unit: item.unit,
        category: item.category,
        store_id: item.store_id,
        store: item.store,
        quantity: item.quantity,
        tr_id: trid,
        timeStamp: item.timeStamp,
        id: uuid.v4(),
        product_id: item._id,
        year :moment.unix(date).format('YYYY'),
        year_month :moment.unix(date).format('MMMM-YYYY'),
        year_week :moment.unix(date).format('WW-YYYY'),
        date: moment.unix(date).format('MMMM DD, YYYY'),
        status: 'Completed',
        attendant_name: name,
        attendant_id: id
      }
      projectPOS.write(() => {
        projectPOS.create(
          "TR_Details",
          new TR_Details(list)
        );
       
      });
    }); 

    onFinalTransaction(lists)
  };

  const onFinalTransaction = (lists) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      const products = projectPOS.objects("Products");
      const filteredProducts = products.filtered("_id == $0", list._id);
  
      lists.forEach(list => {
        const filteredProducts = products.filtered("_id == $0", list._id);
        filteredProducts[0].stock = filteredProducts[0].stock - list.quantity;
      });
            
    });
    setProductss([])
  }
  
  const deleteList = (lists) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      const products = projectPOS.objects("Products");
      const filteredProducts = products.filtered("_id == $0", lists._id);

      const newData = [...projectPOS.objects("List").sorted("name")];
      const prevIndex = list.findIndex(item => item._id === lists._id);
      newData.splice(prevIndex, 1);

      filteredProducts[0].stock += lists.quantity;
      projectPOS.delete(lists);
      setList([Object.assign({}, newData)]);
    });
  };

  const incrementListQty = (qty, list, type, products) => {
    const projectPOS = realmRef.current;
    const filteredProducts = products.find(product => product._id === list._id);
    projectPOS.write(() => {
     
      if(type === 'increment')
      {
 
        filteredProducts.stock = filteredProducts.stock - qty;
        list.quantity =  list.quantity + qty
      }else
      {
  
        filteredProducts.stock = filteredProducts.stock + qty;
        list.quantity =  list.quantity - qty
      }
    
       
    });
  }

  const editListQty = (qty, list) => {
    const projectPOS = realmRef.current;

    projectPOS.write(() => {
      const products = projectPOS.objects("Products");
      const filteredProducts = products.filtered("_id == $0", list._id);
  
      if(list.quantity > parseFloat(qty))
      {
        filteredProducts[0].stock = filteredProducts[0].stock + (list.quantity - parseFloat(qty));
        list.quantity =  parseFloat(qty)
      }else
      {
        filteredProducts[0].stock = filteredProducts[0].stock - (parseFloat(qty) - list.quantity);
        list.quantity =  parseFloat(qty)
      }
    
    
    });
  }

  const createCategories = ( name, uid ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Categories",
        new Categories({
          partition: `project=${user.id}`,
          name : name,
          uid: uid,
        })
      );
    });
  };

  const createStaff = ( name, uid, uname, password ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Staffs",
        new Staffs({
          partition: `project=${user.id}`,
          login_am:"",
          login_pm:"",
          logout_am:"",
          logout_pm:"",
          name : name,
          store_id: uid,
          store: uname,
          password: password
        })
      );
    });
  };

  const ondeleteList = () => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      const list = projectPOS.objects("List");
      const filteredList= list.filtered("store_id == $0", store_info._id);
        projectPOS.delete(filteredList);
  });
  const newData = [...projectPOS.objects("List")];
  setList(newData)
  };

  const ondeleteArchive = () => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      const list = projectPOS.objects("Archive");
      const archive = projectPOS.objects("ArchiveInfo");

      const filteredList= list.filtered("store_id == $0", store_info._id);
      const filteredArchive= archive.filtered("store_id == $0", store_info._id);

      projectPOS.delete(filteredList);
      projectPOS.delete(filteredArchive);
  });
  const newData = [...projectPOS.objects("ArchiveInfo")];
  const newData1 = [...projectPOS.objects("Archive")];
  setArchiveInfo(newData)
  setArchive(newData1)
  };

  const updateArchiveOnClear = (list) => {
    const projectPOS = realmRef.current;
    list.forEach((item) => {
    projectPOS.write(() => {
      const products = projectPOS.objects("Products");
      const filteredProducts = products.filtered("_id == $0", item._id);
      filteredProducts[0].stock += item.quantity;
      });
    });
    ondeleteArchive()
  }

  const updateProductOnClear = (list) => {
    const projectPOS = realmRef.current;
    list.forEach((item) => {
    projectPOS.write(() => {
      const products = projectPOS.objects("Products");
      const filteredProducts = products.filtered("_id == $0", item._id);
      filteredProducts[0].stock += item.quantity;
      });
    });
    ondeleteList()
  }

  const onVoidTransaction = async(item) => {
    const projectPOS = realmRef.current;
    const transaction = projectPOS.objects("Transactions");
    const filteredTransaction = transaction.filtered("_id == $0", item._id);
    const tr_details = projectPOS.objects("TR_Details");
    const filteredTrDetails = tr_details.filtered("tr_id == $0", item._id);
    projectPOS.write(() => {
      filteredTransaction[0].status = "Voided";

      filteredTrDetails.forEach(item => {
        const products = projectPOS.objects("Products");
        const filteredProducts = products.filtered("store_id == $0", item.store_id);
        const filteredProducts2 = filteredProducts.filtered("_id == $0", item.product_id);

        item.status = "Voided"
        filteredProducts2[0].stock += item.quantity;
      });
      });
  }


  const onLogIn = async(item, store_info) => {
    const projectPOS = realmRef.current;
    const store = projectPOS.objects("Stores");
    const filteredStore = store.filtered("_id == $0", store_info._id);

    let newStoreInfo = {
        _id : store_info._id,
        _partition: store_info._partition,
        branch: store_info.branch,
        name: store_info.name,
        owner: store_info.owner,
        password: store_info.password,
        attendant: item.name,
        attendant_id: item._id
    }

    const storeValue = JSON.stringify(newStoreInfo)
    await AsyncStorage.setItem('@store', storeValue)

    projectPOS.write(() => {
      store_info.attendant_id = item._id;
      store_info.attendant = item.name;
      filteredStore[0].attendant_id = item._id;
      filteredStore[0].attendant = item.name
      });

  }

  const onLogOut = async(item, store_info) => {
    const projectPOS = realmRef.current;
    const store = projectPOS.objects("Store");
    const filteredStore = store.filtered("_id == $0", store_info._id);

    let newStoreInfo = {
      _id : store_info._id,
      _partition: store_info._partition,
      branch: store_info.branch,
      name: store_info.name,
      owner: store_info.owner,
      password: store_info.password,
      attendant: "",
      attendant_id: ""
  }

  const storeValue = JSON.stringify(newStoreInfo)
  await AsyncStorage.setItem('@store', storeValue)
 
    projectPOS.write(() => {
      item.outStamp = moment().unix();
      filteredStore[0].attendant = "";
      filteredStore[0].attendant_id = "";
      store_info.attendant_id = "";
      store_info.attendant = ""
      });

  }

  const  deleteTask = (store) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
        projectPOS.delete(store);
    
  });
  
  };


  const getCustomExpense = (type, value, personnel) => {
    const projectPOS = realmRef.current;
    switch (type) {
      
      case 'Today':
          const syncTodaysTransactions = projectPOS.objects("Expenses");
          const filteredTodaysAttendanceLogs = syncTodaysTransactions.filtered("date == $0", value.date);
          const filteredTodaysByPersonnel = filteredTodaysAttendanceLogs.filtered("attendant_id == $0", personnel);
          let sortedTodaysTransactions = filteredTodaysByPersonnel.sorted("timeStamp");
          setExpenses([...sortedTodaysTransactions]);
        break;
        case 'This week':
          const syncThisWeekTransactions = projectPOS.objects("Expenses");
          const filteredThisWeekAttendanceLogs = syncThisWeekTransactions.filtered("year_week == $0", value.date);
          const filteredThisWeekByPersonnel = filteredThisWeekAttendanceLogs.filtered("attendant_id == $0", personnel);
          let sortedThisWeekTransactions = filteredThisWeekByPersonnel.sorted("timeStamp");
          setExpenses([...sortedThisWeekTransactions]);
        break;
      default:

        const syncDefaultTransactions = projectPOS.objects("Expenses");
          const filteredDefaultAttendanceLogs = syncDefaultTransactions.filtered("date == $0", value.date);
          const filteredDefaultByPersonnel = filteredDefaultAttendanceLogs.filtered("attendant_id == $0", personnel);
          let sortedDefaultTransactions = filteredDefaultByPersonnel.sorted("timeStamp");
          setExpenses([...sortedDefaultTransactions]);
        break;
    }
   
  }

  const getCustomTRDetails = (type, value, personnel) => {
    const projectPOS = realmRef.current;
    switch (type) {
      
      case 'Today':
          const syncTodaysTransactions = projectPOS.objects("TR_Details");
          const filteredTodaysAttendanceLogs = syncTodaysTransactions.filtered("date == $0", value.date);
          const filteredTodaysByPersonnel = filteredTodaysAttendanceLogs.filtered("attendant_id == $0", personnel);
          let sortedTodaysTransactions = filteredTodaysByPersonnel.sorted("timeStamp");
          setTransactions([...sortedTodaysTransactions]);
        break;
        case 'This week':
          const syncThisWeekTransactions = projectPOS.objects("TR_Details");
          const filteredThisWeekAttendanceLogs = syncThisWeekTransactions.filtered("year_week == $0", value.date);
          const filteredThisWeekByPersonnel = filteredThisWeekAttendanceLogs.filtered("attendant_id == $0", personnel);
          let sortedThisWeekTransactions = filteredThisWeekByPersonnel.sorted("timeStamp");
          setTransactions([...sortedThisWeekTransactions]);
        break;
      default:

        const syncDefaultTransactions = projectPOS.objects("TR_Details");
          const filteredDefaultAttendanceLogs = syncDefaultTransactions.filtered("date == $0", value.date);
          const filteredDefaultByPersonnel = filteredDefaultAttendanceLogs.filtered("attendant_id == $0", personnel);
          let sortedDefaultTransactions = filteredDefaultByPersonnel.sorted("timeStamp");
          setTransactions([...sortedDefaultTransactions]);
        break;
    }
   
  }

  const getCustomTransaction = (type, value, personnel) => {
    const projectPOS = realmRef.current;
    switch (type) {
      
      case 'Today':
          const syncTodaysTransactions = projectPOS.objects("Transactions");
          const filteredTodaysAttendanceLogs = syncTodaysTransactions.filtered("date == $0", value.date);
          const filteredTodaysByPersonnel = filteredTodaysAttendanceLogs.filtered("attendant_id == $0", personnel);
          let sortedTodaysTransactions = filteredTodaysByPersonnel.sorted("timeStamp");
          setTransactions([...sortedTodaysTransactions]);
        break;
        case 'This week':
          const syncThisWeekTransactions = projectPOS.objects("Transactions");
          const filteredThisWeekAttendanceLogs = syncThisWeekTransactions.filtered("year_week == $0", value.date);
          const filteredThisWeekByPersonnel = filteredThisWeekAttendanceLogs.filtered("attendant_id == $0", personnel);
          let sortedThisWeekTransactions = filteredThisWeekByPersonnel.sorted("timeStamp");
          setTransactions([...sortedThisWeekTransactions]);
        break;
      default:

        const syncDefaultTransactions = projectPOS.objects("Transactions");
          const filteredDefaultAttendanceLogs = syncDefaultTransactions.filtered("date == $0", value.date);
          const filteredDefaultByPersonnel = filteredDefaultAttendanceLogs.filtered("attendant_id == $0", personnel);
          let sortedDefaultTransactions = filteredDefaultByPersonnel.sorted("timeStamp");
          setTransactions([...sortedDefaultTransactions]);
        break;
    }
   
  }

  const onSaveList = (items, user, store_info) => {
    
    let list = {
      _partition: `project=${user.id}`,
      _id: items._id,
      name: items.name,
      brand: items.brand,
      oprice: items.oprice,
      sprice: items.sprice,
      unit: items.unit,
      category: items.category,
      store_id: store_info._id,
      store: items.store,
      quantity: 1,
      uid: items.uid,
      timeStamp: moment().unix(),
  }
 


  let index = products_list.findIndex(x => x._id === items._id);
      if(index === -1){
        setProductss([...products_list, list])
   
  }else{
    setProductss(
      products_list.map((x) => {
     
        if (x._id === items._id)
          return {
            ...x,
            quantity: x.quantity + 1,
            _id : x._id
          };
        return x;
      })
    );
  }

  }

  const incrementQty = (items) => {
    setProductss(
      products_list.map((x) => {
     
        if (x._id === items._id)
          return {
            ...x,
            quantity: x.quantity + 1,
            _id : x._id
          };
        return x;
      })
    );
  }

  const decrementQty = (items) => {
    setProductss(
      products_list.map((x) => {
     
        if (x._id === items._id)
          return {
            ...x,
            quantity: x.quantity - 1,
            _id : x._id
          };
        return x;
      })
    );
  }
  
  const deleteItem = useCallback((itemToDelete) => {
    setProductss((currentItems) =>
      currentItems.filter((item) => item._id !== itemToDelete._id)
    );
  }, []);

    return(
        <StoreContext.Provider
        value={{
            createStore,
            deleteTask,
            stores,
            loading,
            createProducts,
            products,
            createCategories,
            category,
            createExpenses,
            expenses,
            createCustomer,
            customers,
            createStaff,
            staffs,
            createList,
            list,
            deleteList,
            editListQty,
            createTransaction,
            transactions,
            custom_trdetails,
            trdetails,
            store_info,
            getTRDetails,
            createArchive,
            archive,
            archiveInfo,
            ondeleteList,
            updateProductOnClear,
            updateArchiveOnClear,
            reListArchive,
            settings,
            createAttendanceLog,
            attendance_logs,
            onLogIn,
            onLogOut,
            createCreditLogs,
            createCreditList,
            getCustomTransaction,
            getCustomExpense,
            createBO,
            bos,
            createReturn,
            returns,
            incrementListQty,
            onVoidTransaction,
            createDiscount,
            onSaveList,
            products_list,
            incrementQty,
            decrementQty,
            deleteItem
          }}
        >
            {children}
        </StoreContext.Provider>
    );
};


const useStore = () => {
    const store = useContext(StoreContext);
    if (store == null) {
      throw new Error("useStore() called outside of a StoreProvider?"); // an alert is not placed because this is an error for the developer not the user
    }
    return store;
  };

  export { StoreProvider, useStore };