import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/Button";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Slider from "@react-native-community/slider";
import Input from "@/components/Input";
import Alert from "@/components/Alert";
import { Divider, Switch } from "react-native-paper";
import Card from "@/components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/colors/theme";
import globalStyles from "@/colors/global_style";

export default function App() {
  const [routeIndex, setRouteIndex] = useState<number>(0);
  interface PasswordProps {
    id: any;
    name: string;
    password: string;
  }
  const [passwordList, setPasswordList] = useState<PasswordProps[]>([]);

  async function saveList(lista: PasswordProps[]) {
    try {
      await AsyncStorage.setItem("senhas", JSON.stringify(lista));
      console.log("Lista criada!");
    } catch (error) {
      console.log(error);
    }
  }
  async function loadList() {
    try {
      const lista = await AsyncStorage.getItem("senhas");
      const newLista = lista ? JSON.parse(lista) : [];
      setPasswordList(newLista);
    } catch (error) {
      console.log(error);
    }
  }

  async function addItem(item: PasswordProps) {
    try {
      const novaLista = [...passwordList, item];
      setPasswordList(novaLista);
      await saveList(novaLista);
    } catch (error) {
      console.log(error);
    }
  }

  async function removePassword(key: any) {
    try {
      const novaLista = passwordList.filter((item) => item.id != key);
      setPasswordList(novaLista);
      await saveList(novaLista);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (routeIndex === 3) {
      loadList();
    }
  }, [routeIndex]);

  const Home = () => (
    <>
      <StatusBar backgroundColor={"#025985"} />
      <LinearGradient
        // Azul profundo para azul vibrante
        colors={["#05387af6", "#1f7a8c"]}
        style={styles.background}
      />
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageIcon}
          source={require("../assets/logoAPP.png")}
        />
      </View>
      <Text style={[styles.title, globalStyles.text]}>Sentinel Pass</Text>
      <View style={styles.divider} />
      <Text style={[styles.subTitle, globalStyles.text]}>
        Protege suas senhas com Sentinel Pass, o melhor app de senhas do Brasil.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          label="Salvar senha existente"
          onPress={() => setRouteIndex(2)}
          backColor="Terciary"
          icon={<Entypo name="key" size={22} color="#fff" />}
        />
        <Button
          label="Criar nova senha"
          onPress={() => setRouteIndex(1)}
          backColor="Primary"
          icon={<Entypo name="plus" size={26} color="#fff" />}
        />
        <Button
          label="Minhas senhas"
          onPress={() => setRouteIndex(3)}
          backColor="Secondary"
          icon={
            <FontAwesome
              style={{ marginLeft: 6 }}
              name="list-ul"
              size={20}
              color="#fff"
            />
          }
        />
      </View>
    </>
  );

  const CreatePassword = () => {
    const [password, setPassword] = useState("");
    const [passwordSize, setPasswordSize] = useState(0);
    const [passwordName, setPasswordName] = useState("");
    const [includeUpperCase, setIncludeUpperCase] = useState(true);
    const [includeLowerCase, setIncludeLowerCase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
    const [alertVisibleSwitch, setAlertVisibleSwitch] = useState(false);
    const [alertVisibleSize, setAlertVisibleSize] = useState(false);
    const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

    async function createPasswordHandle() {
      const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      const numberChars = "0123456789";
      const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

      let charPool = "";
      if (includeUpperCase) charPool += uppercaseChars;
      if (includeLowerCase) charPool += lowercaseChars;
      if (includeNumbers) charPool += numberChars;
      if (includeSpecialChars) charPool += specialChars;

      if (charPool.length == 0) {
        setAlertVisibleSwitch(true);
        setTimeout(() => {
          setAlertVisibleSwitch(false);
        }, 6000);
        return;
      }
      if (passwordSize == 0) {
        setAlertVisibleSize(true);
        setTimeout(() => {
          setAlertVisibleSize(false);
        }, 6000);
        return;
      }

      let generatedPassword = "";
      for (let i = 0; i < passwordSize; i++) {
        const radomIndex = Math.floor(Math.random() * charPool.length);
        generatedPassword += charPool[radomIndex];
      }
      setPassword(generatedPassword);
      setModalPasswordVisible(true);
    }

    async function addNewPassword() {
      const newPassword = {
        id: Date.now(),
        name: passwordName ?? "Senha sem nome",
        password: password,
      };
      await addItem(newPassword);
      setModalPasswordVisible(false);
      setRouteIndex(0);
    }

    return (
      <>
        <Header
          title="Criar Nova Senha"
          onBack={() => setRouteIndex(0)}
          backColor="Primary"
        />
        <View style={createPasswordStyles.sliderContainer}>
          <Text style={[createPasswordStyles.titleSlider]}>Tamanho da senha</Text>
          <Slider
            value={passwordSize}
            onValueChange={(size: number) => setPasswordSize(size)}
            style={createPasswordStyles.slider}
            minimumTrackTintColor="#0062e2"
            maximumTrackTintColor="#e20800"
            minimumValue={0}
            maximumValue={12}
          />
          <Text style={[createPasswordStyles.textSlider]}>
            <Text style={[createPasswordStyles.spanSlider]}>
              {passwordSize.toFixed(0)}
            </Text>{" "}
            caracteres
          </Text>
          <Alert
            visible={alertVisibleSize}
            onClose={() => setAlertVisibleSize(false)}
            message="Tamanho da senha indefinido!"
            style={createPasswordStyles.alertStyleOne}
          />
        </View>
        <View style={createPasswordStyles.swicthContainer}>
          <View style={createPasswordStyles.swicthContent}>
            <Text style={[createPasswordStyles.switchText]}>
              Letras Maiusculas
            </Text>
            <Switch
              style={createPasswordStyles.switch}
              color="#fff"
              trackColor={{ false: "#ccc", true: "#34934C" }}
              value={includeUpperCase}
              onChange={() => setIncludeUpperCase(!includeUpperCase)}
            />
          </View>
          <Divider bold />
          <View style={createPasswordStyles.swicthContent}>
            <Text style={[createPasswordStyles.switchText]}>
              Letras Minusculas
            </Text>
            <Switch
              style={createPasswordStyles.switch}
              color="#fff"
              trackColor={{ false: "#ccc", true: "#34934C" }}
              value={includeLowerCase}
              onChange={() => setIncludeLowerCase(!includeLowerCase)}
            />
          </View>
          <Divider bold />
          <View style={createPasswordStyles.swicthContent}>
            <Text style={[createPasswordStyles.switchText]}>Números</Text>
            <Switch
              style={createPasswordStyles.switch}
              color="#fff"
              trackColor={{ false: "#ccc", true: "#34934C" }}
              value={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
          </View>
          <Divider bold />
          <View style={createPasswordStyles.swicthContent}>
            <Text style={[createPasswordStyles.switchText]}>
              Caracteres Especiais
            </Text>
            <Switch
              style={createPasswordStyles.switch}
              value={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
              color="#fff"
              trackColor={{ false: "#ccc", true: "#34934C" }}
            />
          </View>
          <Divider bold />
          <Alert
            visible={alertVisibleSwitch}
            onClose={() => setAlertVisibleSwitch(false)}
            message="Escolha uma das opções acima!"
            style={createPasswordStyles.alertStyleTwo}
          />
        </View>
        <Input
          label="Nome da Senha"
          placeholder="Ex: Nubank"
          value={passwordName}
          onChangeText={(text) => setPasswordName(text)}
          style={{
            fontSize: passwordName != "" ? 18 : 16,
          }}
          placeholderTextColor={"#919191"}
        />
        <Button
          label="Criar senha"
          backColor="Primary"
          onPress={() => createPasswordHandle()}
          style={{ marginTop: 20 }}
          disable={passwordName == "" || passwordSize == 0}
        />
        <Modal visible={modalPasswordVisible} transparent animationType="fade">
          <View style={createPasswordStyles.passwordModal}>
            <View style={createPasswordStyles.passwordContainer}>
              <View style={createPasswordStyles.passwordHeader}>
                <Text style={[createPasswordStyles.passwordTitle]}>
                  Sua senha foi gerada com sucesso!
                </Text>
              </View>
              <View style={createPasswordStyles.passwordContent}>
                <Text style={[createPasswordStyles.passwordText]}>
                  {password}
                </Text>
                <MaterialIcons name="content-copy" size={24} color="black" />
              </View>
              <Button
                label="Fechar"
                onPress={() => {
                  addNewPassword();
                }}
                backColor="Terciary"
                style={{
                  alignSelf: "center",
                }}
              />
            </View>
          </View>
        </Modal>
      </>
    );
  };

  const SavePassword = () => {
    const [passwordExists, setPasswordExists] = useState("");
    const [passwordName, setPasswordName] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);

    async function handleSavePasswordExists() {
      try {
        if (!passwordExists) {
          setAlertVisible(true);
          setTimeout(() => {
            setAlertVisible(false);
          }, 6000);
          return;
        }
        const newPasswordExists = {
          id: Date.now(),
          name: passwordName ?? "Senha sem nome",
          password: passwordExists,
        };
        await addItem(newPasswordExists);
        setRouteIndex(0);
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <>
        <Header
          title="Salvar Senha Existente"
          onBack={() => setRouteIndex(0)}
          backColor="Terciary"
        />
        <View style={savePasswordStyles.formContainer}>
          <Input
            label="Nome da Senha"
            placeholder="Ex: Senha do notebook"
            value={passwordName}
            onChangeText={(text) => setPasswordName(text)}
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value={passwordExists}
            onChangeText={(text) => setPasswordExists(text)}
          />
          <Alert
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
            message="Preencha este campo!"
            style={savePasswordStyles.alertStyle}
          />
        </View>
        <Button
          backColor="Terciary"
          label="Salvar senha"
          onPress={() => handleSavePasswordExists()}
          style={{
            marginTop: 50,
          }}
          disable={passwordName === "" || passwordExists === ""}
        />
      </>
    );
  };

  const ListPassword = () => {
    console.log(passwordList);
    const [visiblePasswords, setVisiblePasswords] = useState<
      Record<number, boolean>
    >({});

    const togglePasswordVisibility = (id: number) => {
      setVisiblePasswords((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    const getPasswordDisplay = (password: string, id: number) => {
      return visiblePasswords[id] ? password : "*".repeat(password.length);
    };

    return (
      <>
        <Header
          title="Minhas Senhas"
          onBack={() => setRouteIndex(0)}
          backColor="Terciary"
        />
        <FlatList
          data={passwordList}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => (
            <Card
              namePassword={item?.name}
              password={getPasswordDisplay(item?.password, item?.id)}
              key={item?.id}
              onDelete={() => removePassword(item?.id)}
              eyes={
                <Entypo
                  name={visiblePasswords[item?.id] ? "eye-with-line" : "eye"}
                  size={24}
                  color="black"
                  onPress={() => togglePasswordVisibility(item?.id)}
                />
              }
            />
          )}
          ListEmptyComponent={
            <Text style={[{ textAlign: "center", marginTop: 40, color: "#666" }]}>
              Nenhuma senha salva
            </Text>
          }
        />
      </>
    );
  };

  const routes = [Home, CreatePassword, SavePassword, ListPassword];
  const CurrentRoute = routes[routeIndex];

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <CurrentRoute />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  imageIcon: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    aspectRatio: 1,
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "semibold",
    textAlign: "center",
    width: "80%",
  },
  divider: {
    width: 100,
    height: 1,
    alignSelf: "center",
    backgroundColor: "#ffffff65",
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 50,
    padding: 10,
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
});

const createPasswordStyles = StyleSheet.create({
  sliderContainer: {
    marginTop: 30,
    width: "90%",
    padding: 4,
    flexDirection: "column",
    gap: 12,
  },
  slider: {
    width: "100%",
  },
  titleSlider: {
    fontSize: 20,
    fontWeight: "700",
    color: "#002c6e",
  },
  textSlider: {
    alignSelf: "flex-end",
    color: "#002c6e",
    fontSize: 18,
  },
  spanSlider: {
    fontWeight: "bold",
    fontSize: 24,
  },
  swicthContainer: {
    width: "90%",
    padding: 8,
    position: "relative",
    marginBottom: 100,
    marginTop: 40,
  },
  swicthContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  switchText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#002c6e",
  },
  switch: {
    transform: [{ scale: 1.5 }],
    marginRight: 10,
  },
  passwordModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  passwordContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 30,
    width: "90%",
    elevation: 10,
  },
  passwordHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  passwordTitle: {
    fontSize: 20,
    color: "#002c6e",
    fontWeight: "600",
    textAlign: "center",
  },
  passwordContent: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    marginVertical: 40,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  passwordText: {
    fontSize: 18,
    flex: 1,
    color: "#2c2c2c",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#2c2c2c",
    borderBottomWidth: 0.8,
  },
  alertStyleOne: {
    right: 0,
    left: 10,
    top: 70,
    width: "100%",
  },
  alertStyleTwo: {
    right: 0,
    left: 10,
    top: 220,
  },
});

const savePasswordStyles = StyleSheet.create({
  formContainer: {
    width: "100%",
    marginTop: 60,
    position: "relative",
    paddingBottom: 40,
    gap: 10,
  },
  alertStyle: {
    right: 20,
    left: 20,
    top: 190,
  },
});
