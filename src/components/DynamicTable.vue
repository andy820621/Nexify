<template>
	<div>
		<el-row>
			<el-col :span="8" style="justify-content: flex-start"
				><el-button type="primary" @click="addNewMember">Add</el-button></el-col
			>
			<el-col :span="8" style="justify-content: center"
				><el-button type="success" @click="saveData">Save</el-button></el-col
			>
			<el-col :span="8" style="justify-content: flex-end"
				><el-button type="danger" @click="updateData">Update</el-button></el-col
			>
		</el-row>

		<el-table
			:data="tableData"
			style="width: 100%"
			v-loading.lock="loading"
			element-loading-text="Loading..."
			element-loading-background="rgba(240, 240, 240, 0.5)"
		>
			<el-table-column label="Name" width="180">
				<template #default="scope">
					<el-input v-model="scope.row.name" placeholder="Please input" />
				</template>
			</el-table-column>
			<el-table-column label="Birthday" max-width="300">
				<template #default="scope">
					<el-date-picker
						v-model="scope.row.DateOfBirth"
						class="w-50 m-2"
						placeholder="Pick a date"
						type="date"
					>
						<template #suffix>
							<el-icon class="el-input__icon"><calendar /></el-icon>
						</template>
					</el-date-picker>
				</template>
			</el-table-column>
			<el-table-column label="Salary">
				<template #default="scope">
					<el-slider
						v-model="scope.row.salary"
						placement="right"
						:max="100000"
					/>
				</template>
			</el-table-column>
			<el-table-column label="Address">
				<template #default="scope">
					<el-input v-model="scope.row.address" placeholder="Please input" />
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
import { Calendar } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, computed, watch } from "vue";
import axios from "axios";

const newData = ref([]);
const oldData = ref([]);

const tableData = computed(() => [...newData.value, ...oldData.value]);
const dataSaved = computed(() => newData.value.length === 0);

const loading = ref(false);
const dataChanged = ref(false);

async function getData() {
	loading.value = true;
	try {
		const response = await axios.get("/backend/GetRecords");
		console.log(response);
		let data = response.data;
		let result = data.map((item) => {
			return {
				name: item.Name,
				DateOfBirth: new Date(item.DateOfBirth),
				salary: item.Salary,
				address: item.Address,
			};
		});
		oldData.value = result;

		ElMessage({
			type: "success",
			message: "Successfully update the data!",
		});
	} catch (err) {
		ElMessage({
			type: "error",
			message: err,
		});
	}
	loading.value = false;

	dataChanged.value = false;
}

async function updateData() {
	if (!dataSaved.value || dataChanged.value) {
		await ElMessageBox.confirm(
			`You haven't saved your new members data, are you sure you want to
      update it directly?`,
			"Warning",
			{
				confirmButtonText: "OK",
				cancelButtonText: "Cancel",
				type: "warning",
			}
		)
			.then(getData)
			.catch(() => {
				ElMessage({
					type: "info",
					message: "Update canceled",
				});
			});
	} else {
		getData();
	}
}
async function pushData(data) {
	loading.value = true;
	try {
		let formattedData = data.map((item) => {
			item.DateOfBirth = new Date(`${item.DateOfBirth}`)
				.toLocaleDateString()
				.replaceAll("/", "-");
			return item;
		});
		const response = await axios.post("/backend/SaveRecords", formattedData);
		ElMessage({
			type: "success",
			message: "Successfully post the data!",
		});
	} catch (err) {
		ElMessage({
			type: "error",
			message: err,
		});
	}
	loading.value = false;
}
function addNewMember() {
	newData.value.push({
		name: "",
		birth: "",
		salary: 0,
		address: "",
	});
}
async function saveData() {
	if (oldData.value.length === 0) return;
	if (!dataSaved.value || dataChanged.value) {
		let temp = [...oldData.value, ...newData.value];
		newData.value = [];
		oldData.value = temp;
		await pushData(temp);
		dataChanged.value = false;
	}
}

watch(!dataChanged.value && oldData, () => (dataChanged.value = true), {
	deep: true,
});
</script>

<style>
.el-row {
	margin-bottom: 1rem;
}
.el-col {
	display: flex;
}
.el-button:active {
	transform: translateY(0.24rem);
}
</style>
