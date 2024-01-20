import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
const db = SQLite.openDatabase("base1.db");
const note_sync_table='tableName';

export default function SQLTester() {
    const [consoleLog, setConsoleLog] = useState('console');


    const isTableAvailable = async () => {
        setConsoleLog('checking please wait')
        const status = await isTablePresent();
        setConsoleLog(`${status}`);
    }
    const tableCreation = async () => {
        setConsoleLog('creating please wait')
        const status = await createTableSql();
        if (status) {
            setConsoleLog('created');
        } else {
            setConsoleLog('failed');
        }
    }
    return (
        <View>
            <Text>Sql Tester</Text>
            <Text>{consoleLog}</Text>
            <TouchableOpacity onPress={isTableAvailable}>
                <View><Text>is table Available</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={tableCreation}>
                <View><Text>create table</Text></View>
            </TouchableOpacity>
        </View>
    )
}




async function createTableSql() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `create table if not exists ${note_sync_table} (
                    id integer primary key not null,
                    title text,
                    description text,
                    color text,
                    created_time text,
                    modified_time text
                );`,
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        },
            (error) => console.error("Transaction Error:", error),
        );
    });
}


async function isTablePresent() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `SELECT name FROM sqlite_master WHERE type='table' AND name=?;`,
                    [note_sync_table],
                    (_, result) => {
                        if (result.rows.length > 0) {
                            resolve(true);
                        }
                        resolve(false);
                    },
                    (_, error) => reject(new Error("Error checking table existence: " + error))
                );
            },
            (error) => {
                reject(new Error("Transaction error: " + error));
            }
        );
    });
}