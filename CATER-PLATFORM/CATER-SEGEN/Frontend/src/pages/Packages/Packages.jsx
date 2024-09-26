import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './Packages.css';

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const packages = [
    {
      name: "Cocktail Diamond Exotic",
      categories: [
        {
          name: " Snacks",
          items: [
            {
              "value": "Green Salad",
              "name": "Green Salad"
            },
            {
              "value": "Green Peas Masala",
              "name": "Green Peas Masala"
            },
            {
              "value": "Sweet American Corn",
              "name": "Sweet American Corn"
            }
          ]
        },
        {
          name: "Pass Around Snacks - Veg (ANY THREE)",
          qty: 3,
          items: [
            {
              "value": "Cheese Balls",
              "name": "Cheese Balls"
            },
            {
              "value": "Cheese Potato Wedges Melt",
              "name": "Cheese Potato Wedges Melt"
            },
            {
              "value": " Cheese Tart",
              "name": " Cheese Tart"
            },
            {
              "value": "Cocktail corn samosa",
              "name": "Cocktail corn samosa"
            },
            {
              "value": " Corn Cheese Kabab",
              "name": " Corn Cheese Kabab"
            },
            {
              "value": " Corn Fitters",
              "name": " Corn Fitters"
            },
          ]
          
        },
        {
          name: "GRINDED CHUTNIES (ANY TWO)",
          qty:2,
          items: [
            {
              "value": "Beerakaya, Dondakai",
              "name": "Beerakaya, Dondakai"
            },
            {
              "value": "Brinjal, Tomato, Cucumber",
              "name": "Brinjal, Tomato, Cucumber"
            },
            {
              "value": " Dondakai Pachadi",
              "name": " Dondakai Pachadi"
            },
            {
              "value": " Dosakaya Mukkala Chutney",
              "name": " Dosakaya Mukkala Chutney"
            },
            {
              "value": " Gongura Onion",
              "name": " Gongura Onion"
            },
            {
              "value": " Green Chilli & Apple Pachadi",
              "name": " Green Chilli & Apple Pachadi"
            },
            {
              "value": "Kandi Pachadi",
              "name": "Kandi Pachadi"
            },
            {
              "value": " Kobbari Chintakaya Pachadi",
              "name": " Kobbari Chintakaya Pachadi"
            },
            {
              "value": " Mango Thururnu",
              "name": " Mango Thururnu"
            },
            {
              "value": " Pachi Jamakaya Chutney",
              "name": " Pachi Jamakaya Chutney"
            },
            {
              "value": " Pachi Tomato Chutney",
              "name": " Pachi Tomato Chutney"
            }
          ]
        },
        {
          name: "NON-VEG - BIRYANI’S (ANY ONE) -",
          qty:2,
          items: [
            {
              "value": " Bilal Mutton Biryani with katta",
              "name": " Bilal Mutton Biryani with katta"
            },
            {
              "value": " Hyderabadi Mugalai Mutton Biryani",
              "name": " Hyderabadi Mugalai Mutton Biryani"
            },
            {
              "value": " Hyderabadi Chicken Dum Biryani",
              "name": " Hyderabadi Chicken Dum Biryani"
            },
            {
              "value": " Vijawada Style Chicken Biryani",
              "name": " Vijawada Style Chicken Biryani"
            },
            {
              "value": " Bilal Prawn Biryani",
              "name": " Bilal Prawn Biryani"
            },
            {
              "value": " Chicken Ulavacharu Dum Biryani",
              "name": " Chicken Ulavacharu Dum Biryani"
            },
            {
              "value": " Chettinadu Chicken Dum Biryani",
              "name": " Chettinadu Chicken Dum Biryani"
            },
            {
              "value": " Chettinadu Mutton Dum Biryani",
              "name": " Chettinadu Mutton Dum Biryani"
            },
            {
              "value": " Chicken Fry Piece Biryani",
              "name": " Chicken Fry Piece Biryani"
            }
          ]
        },        
      ]
    }
  ];

  const [state, setState] = useState({
    Filters: packages,
    selected: [],
  });

  const handleCheckboxChange = (value, category) => {
    setState((prevState) => {
      const selectedItems = prevState.selected;
      const updatedSelected = selectedItems.includes(value)
        ? selectedItems.filter(item => item !== value)
        : [...selectedItems, value];

      const packageInfo = packages.find(pkg => pkg.name === selectedPackage);

      if (!packageInfo || !packageInfo.categories) {
        return prevState;
      }

      // Find the category containing the selected item
      const selectedCategory = packageInfo.categories.find(cat => cat.name === category);

      // Calculate the quantity for the selected category
      const selectedItemsInCategory = updatedSelected.filter(item =>
        selectedCategory.items.some(it => it.value === item)
      );
      const selectedQty = selectedItemsInCategory.length;

      // Check if the quantity of selected items exceeds the limit for this category
      if (selectedCategory && selectedQty > selectedCategory.qty) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "You've selected more than the allowed items!",
          text: "Additional charges may apply for the extra items.",
          showConfirmButton: true,
          confirmButtonColor: "#d33",
        });
      }

      return {
        selected: updatedSelected,
        Filters: prevState.Filters.map(pkg => ({
          ...pkg,
          categories: pkg.categories.map(cat => ({
            ...cat,
            items: cat.items.map(item => ({
              ...item,
              checked: updatedSelected.includes(item.value),
            }))
          }))
        }))
      };
    });
  };

  const handlePackageSelect = (packageName) => {
    setSelectedPackage(packageName);
    const selectedPackageInfo = packages.find(pkg => pkg.name === packageName);
    if (selectedPackageInfo) {
      setState({ Filters: packages, selected: [] });
    }
  };

  useEffect(() => {
    const externalPackage = location.state.packageName;
    const externalformData = location.state.externalformData;
    if (externalPackage) {
      handlePackageSelect(externalPackage);
    }
    if (externalformData) {
      setFormData(externalformData);
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  const onSubmit = () => {
    const externalPackage = location.state.currentPackage;
    const externalData = {
      ...formData,
      selected: state.selected,
      packageName: externalPackage,
    };
    const redirectPath =
      location.state.cateringType === "Event Catering"
        ? "/event-catering"
        : location.state.cateringType === "Corporate Catering"
        ? "/corporate-catering"
        : "/event-catering";
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Items in the package are selected successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate(redirectPath, { state: { data: externalData } });
  };

  const renderMenu = () => {
    if (!selectedPackage) {
      return <p className="text-black text-4xl font-semibold  ">Please select a package</p>;
    }

    return (
      <div>
        <h2 className="text-lg font-bold mb-4">{selectedPackage} Menu</h2>
        {state.Filters
          .find(pkg => pkg.name === selectedPackage)?.categories.map((category) => (
            <React.Fragment key={category.name}>
              <br />
              <h3 className="text-md font-bold mb-2">{category.name}</h3>
              {category.items.map((item) => (
                <div key={item.value} className="checkboxes parent_div_1">
                  <label style={{ color: item.warning ? 'red' : 'black' }}>{item.value}</label>
                  <input
                    checked={item.checked || false}
                    onChange={() => handleCheckboxChange(item.value, category.name)}
                    type="checkbox"
                  />
                  {item.warning && <p style={{ color: 'red', fontSize: '0.8rem', fontStyle: 'italic' }}>(Extra charges may apply)</p>}
                </div>
              ))}
            </React.Fragment>
          ))}
        <br />
      </div>
    );
  };

  return (
    <div>
      <div className="page-header1 mb-0">
        <div className="container">
          <div className="row mx-auto text-center justify-center">
            <div className="col-12">
              <h2 className="font-extrabold text-6xl text-green" >PACKAGES</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row ms-12 items-center">
        <div className="w-auto md:w-1/2  shadow-2xl" id="rendermenu">
          {renderMenu()}
        </div>
        <div className="w-full md:w-1/3 p-4">
          <h2 className="text-5xl font-bold mb-4" id="clippath2">{selectedPackage}</h2>
          <div className="mb-4 w-full">
            <div key={selectedPackage} className={`border shadow-2xl rounded-3xl p-10 text-xl mb-5 bg-white cursor-pointer flex justify-between items-center ${selectedPackage}`}>
              <div className="result-tab text-sm">
                <strong>Selected: </strong>
                <br />
                <ul>
                {state.selected.map((item, index) => {
  // Find the selected package object
  const selectedPackageObj = packages.find(pkg => pkg.name === selectedPackage);

  // Find the category containing the selected item
  const selectedCategory = selectedPackageObj.categories.find(cat =>
    cat.items.some(it => it.value === item)
  );

  // Get the quantity for the selected category
  const packageQty = selectedCategory ? selectedCategory.qty : 0;

  // Get the count of the selected item in the category
  const selectedItemCount = state.selected.filter(selectedItem =>
    selectedCategory.items.some(catItem => catItem.value === selectedItem)
  ).length;

  // Determine whether the item exceeds the quantity limit
  const exceedsQtyLimit = selectedItemCount > packageQty;

  return (
    
    <React.Fragment key={index}>
      <b><h1>{selectedCategory.name}</h1></b>
      <ul>
        <li style={{ color: exceedsQtyLimit ? 'red' : 'black' }}>
          {item}
          {exceedsQtyLimit && <span style={{ color: 'red', fontSize: '0.8rem' }}>(Extra charges may apply)</span>}
        </li>
      </ul>
    </React.Fragment>
  );
})}

                </ul>
                <br />
                <button
                  onClick={onSubmit}
                  className="w-full px-4 py-2 bg-green text-white rounded-md hover:bg-green-dark"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Packages;
