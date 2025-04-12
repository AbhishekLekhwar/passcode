import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { MdAddCircleOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";

const Manager = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [sites, setSites] = useState("default");
  const [showPass, setShowPass] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInput = (e) => {
    setPassword(e.target.value);
  }

  const handleShowPass = () => {
    setShowPass(!showPass);
  }

  const handleEdit = (index) => {
    const credential = savedCredentials[index];
    setUserName(credential.userName);
    setPassword(credential.password);
    setSites(credential.site);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const site = savedCredentials[index].site;
    localStorage.removeItem(site);
    setSavedCredentials(savedCredentials.filter((_, i) => i !== index));
  };

    const savePassword = () => {
        if (!userName || !password || !sites) {
            alert('Please fill in all fields');
            return;
        }
        
        try {
            const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret key').toString();
            const credentials = { userName, password: encryptedPassword };
            if (editingIndex !== null) {
                localStorage.setItem(sites, JSON.stringify(credentials));
                alert('Password updated successfully!');
                setEditingIndex(null);
            } else {
                localStorage.setItem(sites, JSON.stringify(credentials));
                alert('Password saved successfully!');
            }
            
            // Reset input fields after saving
            console.log("Saving credentials:", credentials); // Debugging log
            setUserName("");
            setPassword("");
            setSites("default");
            
            loadCredentials(); // Load credentials after saving
        } catch (error) {
            console.error('Encryption failed:', error);
            alert('Failed to save password. Please try again.');
        }
    }


  const loadCredentials = () => {
    const credentialsArray = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const value = JSON.parse(localStorage.getItem(key));
        if (value && value.password) {
          try {
            const bytes = CryptoJS.AES.decrypt(value.password, 'secret key');
            const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (decryptedPassword) {
              credentialsArray.push({ 
                site: key, 
                userName: value.userName, 
                password: decryptedPassword 
              });
            }
          } catch (decryptError) {
            console.error('Decryption failed for:', key, decryptError);
            // Optionally keep the encrypted password for recovery
            credentialsArray.push({ 
              site: key, 
              userName: value.userName, 
              password: '[Encrypted - needs re-entry]'
            });
          }
        }
      } catch (parseError) {
        console.error('Failed to parse localStorage item:', key, parseError);
      }
    }
    setSavedCredentials(credentialsArray);
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  useEffect(() => {
    loadCredentials(); // Load credentials on component mount
  }, []);

  return (
-    <div className='flex flex-col bg-green-50 min-h-screen mx-24'>
+    <div className='flex flex-col bg-green-50 min-h-screen mx-4 sm:mx-24'>
      <div className='flex flex-col mt-8'>
        <div className='mx-auto p-4 flex items-center gap-3 flex-wrap'>
          <select className='rounded-xl p-2' name='sites' onChange={(e) => setSites(e.target.value)}>
            <option value='default'>default</option>
            <option value='facebook'>Facebook</option>
            <option value='twitter'>Twitter</option>
            <option value='instagram'>Instagram</option>
            <option value='linkedin'>LinkedIn</option>
          </select>

          <input type='text' placeholder='Enter UserName' name='userName' className='border-2 border-purple-300 p-2 m-2 rounded-2xl w-full' onChange={(e) => setUserName(e.target.value)} />

          <div className="relative items-center w-full">
            <input type={showPass ? 'text' : 'password'} name='password' placeholder='Enter your password' className='border-2 border-purple-300 p-2 rounded-2xl w-full' onChange={handleInput} />
            <span className='absolute right-2 top-3 cursor-pointer'>
              {showPass ? <FaEye onClick={handleShowPass} /> : <FaEyeSlash onClick={handleShowPass} />}
            </span>
          </div>

          <button type='submit' onClick={savePassword} className='bg-purple-300 p-2 m-2 border-2 border-blue-400 rounded-2xl hover:text-white hover:bg-green-400 hover:border-white flex items-center gap-2'>
            <span><MdAddCircleOutline /></span>{editingIndex !== null ? 'Save Changes' : 'Add Password'}
          </button>
        </div>
      </div>

      {/* Display saved credentials in a table */}
      <div className='mt-8 overflow-x-auto'>
        <table className='min-w-full border-collapse border border-gray-200'>
          <thead>
            <tr>
              <th className='border border-gray-300 p-2 text-center'>Site</th>
              <th className='border border-gray-300 p-2 text-center'>Username</th>
              <th className='border border-gray-300 p-2 text-center'>Password</th>
              <th className='border border-gray-300 p-2 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedCredentials.map((cred, index) => (
              <tr key={index}>
                <td className='border border-gray-300 p-2 text-center'>
                  <a 
                    href={`https://${cred.site.toLowerCase()}.com/login`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {cred.site}
                  </a>
                </td>
                <td className='border border-gray-300 p-2 text-center'>{cred.userName}  <button onClick={() => copyToClipboard(cred.userName)} className='bg-green-300 p-1 rounded '><IoMdCopy /></button></td>
                <td className='border border-gray-300 p-2 text-center'>{cred.password}<button onClick={() => copyToClipboard(cred.password)} className='bg-green-300 p-1 rounded'><IoMdCopy /></button></td>
                <td className='border border-gray-300 p-2  text-center'>
                  <button onClick={() => handleEdit(index)} className='bg-blue-300 px-4 py-1 m-1 border border-blue-400  rounded-2xl'>Edit</button>
                  <button onClick={() => handleDelete(index)} className='bg-red-300 p-1 rounded-2xl border border-red-400'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Manager;
